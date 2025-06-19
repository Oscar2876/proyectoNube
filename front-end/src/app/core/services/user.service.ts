import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:7000/api/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener todos los usuarios
     obtenerUsuarios() {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // También puedes agregar otros métodos si los necesitas:
  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
