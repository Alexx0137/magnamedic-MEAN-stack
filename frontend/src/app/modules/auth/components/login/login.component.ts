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
        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                console.log('Inicio de sesión exitoso:', response);
                localStorage.setItem('token', response.token);
                const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.queryParamMap.get('returnUrl') || '/dashboard';
                this.router.navigate([returnUrl]);
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                this.errorMessage = error.error;
            }
        });
    }
}
