import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RutinaService {
    private apiUrl = '/api/rutinas';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getRutinasPorUsuario(): Observable<any[]> {
        const token = this.authService.getToken();
        if (!token) {
            throw new Error('Token no encontrado');
        }
        const decoded: any = jwtDecode(token);
        const usuarioId = decoded.userId; // Asegúrate de que el token contenga "userId"

        return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
    }
}