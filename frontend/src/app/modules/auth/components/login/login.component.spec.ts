import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    const mockAuthService = {
        login: jasmine.createSpy('login').and.returnValue(of({ token: 'mockToken' })),
    };

    const mockRouter = {
        navigate: jasmine.createSpy('navigate'),
        getCurrentNavigation: () => ({
            extractedUrl: {
                queryParamMap: {
                    get: () => null
                }
            }
        })
    };

    beforeEach(() => {
        // Mock para localStorage
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            localStorage[key] = value;
        });
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                CommonModule, // Importa CommonModule aquí
                LoginComponent // Asegúrate de importarlo aquí
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debe existir el LoginComponent', () => {
        expect(component).toBeTruthy();
    });

    it('debe iniciar sesión correctamente', () => {
        component.credentials = { email: 'test@example.com', password: 'password' };
        component.login();
        expect(mockAuthService.login).toHaveBeenCalledWith(component.credentials);
        expect(localStorage.getItem('token')).toBe('mockToken');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('Debe manejar el error de inicio de sesión', () => {
        mockAuthService.login.and.returnValue(throwError({ error: 'Invalid credentials' }));
        component.credentials = { email: 'test@example.com', password: 'wrongpassword' };
        component.login();
        expect(component.errorMessage).toBe('Invalid credentials');
    });

    it('no debe permitir iniciar sesión si los campos están vacíos', () => {
        component.credentials = { email: '', password: '' };
        component.login();
        expect(mockAuthService.login).not.toHaveBeenCalled();
        expect(component.errorMessage).toBe('Por favor complete todos los campos');
    });
});
