import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../core/services/user.service'; 
import { RutinaService } from '../../../../../../core/services/rutina.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrenador-panel',
  templateUrl: './entrenador-panel.component.html',
  styleUrls: ['./entrenador-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class EntrenadorPanelComponent implements OnInit {
  usuarios: any[] = [];

  rutina = {
    nombre: '',
    descripcion: '',
    duracionDias: 0,
    fechaInicio: '',
    fechaFin: '',
    usuario: { id: null }
  };

  constructor(
    private rutinaService: RutinaService,
    private usuarioService: UserService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        // 🔍 Filtra usuarios con rol.nombre === 'USUARIO'
        this.usuarios = data.filter((u: any) => u.rol?.nombre === 'USUARIO');
        console.log('Usuarios filtrados:', this.usuarios);
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.rutina.usuario.id) {
      alert('Debes seleccionar un usuario');
      return;
    }

    this.rutinaService.crearRutina(this.rutina).subscribe({
      next: () => {
        alert('Rutina asignada con éxito');
        this.limpiarFormulario();
      },
      error: err => {
        alert('Error al asignar rutina');
        console.error(err);
      }
    });
  }

  limpiarFormulario(): void {
    this.rutina = {
      nombre: '',
      descripcion: '',
      duracionDias: 0,
      fechaInicio: '',
      fechaFin: '',
      usuario: { id: null }
    };
  }
}
