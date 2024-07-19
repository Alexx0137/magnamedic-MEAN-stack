import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
     * @author Nelson García
     */
    login(): void {
        if (!this.credentials.email || !this.credentials.password) {
            this.errorMessage = 'Por favor complete todos los campos';
            return;
        }

        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.user.id);

                const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.queryParamMap.get('returnUrl') || '/dashboard';
                this.router.navigate([returnUrl]);
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = error.error?.message || 'Error en el inicio de sesión. Inténtalo de nuevo.';
            }
        });
    }
}
