import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de importar

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private baseUrl = 'http://localhost:7000/api/rutinas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  crearRutina(rutina: any): Observable<any> {
    const headers = this.authService.getAuthHeaders(); // ✅ Añadir token
    return this.http.post(`${this.baseUrl}`, rutina, { headers });
  }

  obtenerRutinasPorUsuario(usuarioId: number): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`, { headers });
  }
}

