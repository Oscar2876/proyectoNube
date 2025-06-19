import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private baseUrl = 'http://localhost:7000/api/rutinas';

  constructor(private http: HttpClient) {}

  crearRutina(rutina: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, rutina);
  }

  obtenerRutinasPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }
}
