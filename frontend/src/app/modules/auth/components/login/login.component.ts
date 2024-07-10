import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common'; // Asegúrate de importar CommonModule
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = { email: '', password: '' };
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);

    onLogin() {
        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                console.log('Inicio de sesión exitoso:', response);
                localStorage.setItem('token', response.token);
                const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.queryParamMap.get('returnUrl') || '/dashboard';
                this.router.navigate([returnUrl]);
            },
            error: (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.errorMessage = 'Credenciales inválidas';
                } else if (error.status === 404) {
                    this.errorMessage = 'Usuario no encontrado';
                } else {
                    this.errorMessage = 'Error en el servidor';
                }
            }
        });
    }
}
