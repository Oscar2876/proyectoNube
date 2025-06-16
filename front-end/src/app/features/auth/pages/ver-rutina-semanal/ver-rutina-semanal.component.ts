import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { RutinaService } from '../../../../core/services/rutina.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-ver-rutina-semanal',
  templateUrl: './ver-rutina-semanal.component.html',
  styleUrls: ['./ver-rutina-semanal.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VerRutinaSemanalComponent implements OnInit {
  rutinas: any[] = [];
  usuarioId: number | null = null;

  constructor(
    private rutinaService: RutinaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
    this.rutinaService.getRutinasPorUsuario().subscribe(
      (data) => {
        this.rutinas = data;
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    );
  }
}