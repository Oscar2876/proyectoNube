import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[FormsModule,CommonModule,HttpClientModule],
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rol: string | null = null;
  nombre: string | null = null;

  constructor(private authService: AuthService,    private router: Router,) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.rol = decoded.rol || null;
      this.nombre = decoded.nombre || null; 
    }
  }
  
   registerrutinasubmit() {
    this.router.navigate(['/registro-actividad']);
  }
  registerrutinasubmitus() {
    this.router.navigate(['/panel-entrenador']);
  }
    
   viewrutinasubmit() {
    this.router.navigate(['/ver-rutina-semanal']);
  }
}
