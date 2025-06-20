import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenKey = 'auth_token'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
 login(email: string, password: string): Observable<any> {
  return this.http.post<{ token: string }>(
    `${this.apiUrl}/login`,
    { correo: email, clave: password }
  ).pipe(
    tap(response => {
      // 🔧 Guardar solo el string del JWT, no el objeto completo
      const token = response.token;
      localStorage.setItem('auth_token', token);
      console.log('✅ Token guardado correctamente:', token);
    })
  );
}

  // Método para registrar un nuevo usuario
  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  // Almacenar el token en localStorage
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión (eliminar el token)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Agregar el token a las cabeceras HTTP
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
    sendNotification(data: { token: string; title: string; body: string }) {
    return this.http.post(`${environment.apiUrlMicroservice}/notify/push`, null, {
      params: {
        token: data.token,
        title: data.title,
        body: data.body
      }
    });
  }
}
