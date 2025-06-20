import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../core/services/user.service';
import { RutinaService } from '../../../../../../core/services/rutina.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-entrenador-panel',
  templateUrl: './entrenador-panel.component.html',
  styleUrls: ['./entrenador-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class EntrenadorPanelComponent implements OnInit {
  usuarios: any[] = [];
  selectedUsuarioId: number | null = null;
  cargando: boolean = false;
  autorizado: boolean = false;

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
    private usuarioService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const authorities = decoded?.authorities || [];

      if (authorities.includes('ENTRENADOR') || decoded.rol === 'ENTRENADOR') {
        this.autorizado = true;
        this.cargarUsuarios();
      } else {
        alert('No tienes permiso para acceder a este módulo.');
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('No has iniciado sesión.');
      this.router.navigate(['/login']);
    }
  }

  cargarUsuarios(): void {
    this.cargando = true;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.usuarioService.obtenerUsuariosConHeaders(headers).subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('🟢 Usuarios completos recibidos:', data);
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.selectedUsuarioId) {
      alert('Debes seleccionar un usuario');
      return;
    }

    const rutinaConUsuario = {
      ...this.rutina,
      usuario: { id: this.selectedUsuarioId }
    };

    this.rutinaService.crearRutina(rutinaConUsuario).subscribe({
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
    this.selectedUsuarioId = null;
  }
}
