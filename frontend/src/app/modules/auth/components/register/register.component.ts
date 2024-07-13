import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common'; // Asegúrate de importar CommonModule
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {UserService} from "../../../users/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    credentials = {
        email: '',
        password: ''
    };
    errorMessage = '';
    isRegistering = false;

    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);
    private toastr = inject(ToastrService);

    /**
     * Iniciar sesión con las credenciales proporcionadas.
     * Envía las credenciales al servicio de autenticación y maneja la respuesta.
     *
     * @returns {void}
     * @author [Tu Nombre]
     */
    register(data: any): void {
        this.isRegistering = true;
        this.authService.register(data).subscribe({
            next: (response) => {
                this.toastr.success(response.message, 'Muy bien');
                this.router.navigate(['/login']); // Redirigir al dashboard tras el registro
            },
            error: (error: HttpErrorResponse) => {
                if (error.error && error.error.message) {
                    this.errorMessage = error.error.message; // Mostrar mensaje de error específico si existe
                } else {
                    this.errorMessage = 'Error al registrarse. Inténtalo de nuevo más tarde.';
                }
                console.error('Error al registrarse:', error);
            },
            complete: () => {
                this.isRegistering = false;
            }
        });
    }
}
