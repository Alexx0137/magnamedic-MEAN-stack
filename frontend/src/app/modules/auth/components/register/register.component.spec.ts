import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../../users/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserResponse } from '../../../users/services/user.service'; // Ajusta la importación según tu estructura

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let userService: jasmine.SpyObj<UserService>;
    let toastrService: jasmine.SpyObj<ToastrService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser']);
        const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: ToastrService, useValue: toastrSpy },
                { provide: Router, useValue: routerSpy },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        fixture.detectChanges();
    });

    it('Debe existir el RegisterComponent', () => {
        expect(component).toBeTruthy();
    });

    it('Debe registrarse exitosamente', () => {
        const mockResponse: UserResponse = {
            message: 'Registro exitoso',
            status: 'success'
        };
        userService.createUser.and.returnValue(of(mockResponse));

        component.register({ email: 'test@example.com', password: 'password' });

        expect(toastrService.success).toHaveBeenCalledWith(mockResponse.message, 'Muy bien');
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('Debe manejar el error de registro', () => {
        const mockError = { error: { message: 'Error al registrarse' } };
        userService.createUser.and.returnValue(throwError(mockError));

        component.register({ email: 'test@example.com', password: 'password' });

        expect(component.errorMessage).toBe('Error al registrarse');
        expect(toastrService.success).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('no debe permitir registrarse si los campos están vacíos', () => {
        component.register({ email: '', password: '' });
        expect(userService.createUser).not.toHaveBeenCalled();
        expect(component.errorMessage).toBe('Por favor complete todos los campos');
    });

});
