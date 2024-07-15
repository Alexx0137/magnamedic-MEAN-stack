import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common'; // Asegúrate de importar CommonModule
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = {
        email: '',
        password: ''
    };
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);

    /**
     * Iniciar sesión con las credenciales proporcionadas.
     * Envía las credenciales al servicio de autenticación y maneja la respuesta.
     *
     * @returns {void}
     * @author [Tu Nombre]
     */
    login(): void {
        if (!this.credentials.email || !this.credentials.password) {
            this.errorMessage = 'Por favor complete todos los campos';
            return;
        }

        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('name', response.user.name); // Almacena el nombre
                localStorage.setItem('last_name', response.user.last_name); // Almacena el apellido
                const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.queryParamMap.get('returnUrl') || '/dashboard';
                this.router.navigate([returnUrl]);
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = error.error?.message || 'Error en el inicio de sesión. Inténtalo de nuevo.';
            }
        });
    }
}
