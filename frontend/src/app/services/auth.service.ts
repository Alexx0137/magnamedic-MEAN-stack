import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {User} from "../models/user";
import {Observable, tap} from "rxjs";
import {UserResponse} from "../modules/users/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL_API = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient,
                private router: Router) {}



    register(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.URL_API + '/register', user)
}

    /**
     * Inicia sesión al usuario con las credenciales proporcionadas.
     */
    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post<any>(this.URL_API + '/login', credentials)
            .pipe(tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('name', response.user.name);
                    localStorage.setItem('last_name', response.user.last_name);
                }
            }));
    }

    /**
     * Verifica si hay un token de autenticación almacenado en el localStorage.
     *
     * @returns `true` si el usuario está autenticado (hay un token), `false` en caso contrario.
     * @author Nelson garcía
     */
    loggedIn() {
       return !!localStorage.getItem('token');
    }

    /**
     * Obtiene el token de autenticación almacenado en el localStorage.
     *
     * @returns El token de autenticación o `null` si no hay ninguno.
     * @author Nelson garcía
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Cierra la sesión del usuario eliminando el token y redirigiendo a la página de inicio de sesión.
     * @author Nelson garcía
     */
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
