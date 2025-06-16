import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrls: ['./registro-actividad.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class RegistroActividadComponent {
  fecha: string | null = null;
  duracionMinutos: number = 0;
  caloriasQuemadas: number = 0;
  repeticiones: number = 0;
  peso: number = 0;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.userId; // Asegúrate de que el token contenga "userId"
    }
  }

  onSubmit() {
    if (!this.userId || !this.fecha) {
      alert('Usuario no encontrado o fecha no seleccionada');
      return;
    }

    const actividad = {
      fecha: this.fecha,
      duracionMinutos: this.duracionMinutos,
      caloriasQuemadas: this.caloriasQuemadas,
      repeticiones: this.repeticiones,
      peso: this.peso,
      usuario: { id: this.userId }
    };

    this.http.post('/api/actividades', actividad)
      .subscribe(
        (response: any) => {
          alert('Registro guardado con éxito');
          this.limpiarFormulario();
        },
        (error) => {
          alert('Error: ' + error.error.message);
        }
      );
  }

  limpiarFormulario() {
    this.fecha = null;
    this.duracionMinutos = 0;
    this.caloriasQuemadas = 0;
    this.repeticiones = 0;
    this.peso = 0;
  }
}