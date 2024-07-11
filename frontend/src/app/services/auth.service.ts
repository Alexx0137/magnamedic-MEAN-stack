import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL_API = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient,
                private router: Router) {}



    register(credentials: { email: string, password: string }){
    return this.http.post<any>(this.URL_API + '/register', credentials)
}

    /**
     * Inicia sesión al usuario con las credenciales proporcionadas.
     *
     * @param credentials Objeto con el correo electrónico y la contraseña del usuario.
     * @returns Un Observable que emite la respuesta del servidor en caso de éxito, o un error en caso de fallo.
     * @author Nelson garcía
     */
    login(credentials: { email: string, password: string }){
        return this.http.post<any>(this.URL_API + '/login', credentials)
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
