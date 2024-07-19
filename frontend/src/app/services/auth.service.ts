import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Observable, tap } from "rxjs";
import { UserResponse } from "../modules/users/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL_API = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient,
                private router: Router) {}

    register(user: User): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.URL_API + '/register', user);
    }

    /**
     * Inicia sesión al usuario con las credenciales proporcionadas.
     */
    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post<any>(this.URL_API + '/login', credentials)
    }

    /**
     * Verifica si hay un token de autenticación almacenado en el localStorage.
     *
     * @returns `true` si el usuario está autenticado (hay un token), `false` en caso contrario.
     * @author Nelson García
     */
    loggedIn() {
        return !!localStorage.getItem('token');
    }

    /**
     * Obtiene el token de autenticación almacenado en el localStorage.
     *
     * @returns El token de autenticación o `null` si no hay ninguno.
     * @author Nelson García
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Obtiene el ID del usuario logueado.
     *
     * @returns El ID del usuario o `null` si no hay uno.
     */
    getUserId(): string | null {
        return localStorage.getItem('userId'); // Devuelve directamente el string o null
    }

    /**
     * Cierra la sesión del usuario eliminando el token y redirigiendo a la página de inicio de sesión.
     * @author Nelson García
     */
    logout(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
