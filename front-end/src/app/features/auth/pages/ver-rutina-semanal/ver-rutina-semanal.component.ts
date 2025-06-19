import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { RutinaService } from '../../../../core/services/rutina.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-rutina-semanal',
  templateUrl: './ver-rutina-semanal.component.html',
  styleUrls: ['./ver-rutina-semanal.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class VerRutinaSemanalComponent implements OnInit {
  rutinas: any[] = [];
  usuarioId: number | null = null;

  constructor(
    private rutinaService: RutinaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.usuarioId = decoded?.id || decoded?.userId || decoded?.sub;

      if (this.usuarioId) {
        this.obtenerRutinas(this.usuarioId);
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    } else {
      console.error('Token no encontrado');
    }
  }

  obtenerRutinas(usuarioId: number): void {
    this.rutinaService.obtenerRutinasPorUsuario(usuarioId).subscribe({
      next: (data) => {
        this.rutinas = data;
      },
      error: (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    });
  }
}
