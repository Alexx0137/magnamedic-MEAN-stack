import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgIf} from "@angular/common";

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgIf
    ],
    providers: [DatePipe],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    userForm!: FormGroup;
    public id: any = null;
    isEditMode = false;
    isActive= false ;

    constructor(
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.initForm();

        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.isEditMode = !!this.id;

            if (this.isEditMode) {
                this.getUser();
            }
        });
    }

    initForm(): void {
        this.userForm = this.formBuilder.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            identification: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', this.isEditMode ? Validators.required : null],
            confirmPassword: ['', this.isEditMode ? Validators.required : null],
            role: ['', [Validators.required]],
            state: [1, [Validators.required]],
        });
    }

    createUser(data: any): void {
        this.userService.createUser(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/users/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear el paciente', 'Error');
                }
            });
    }

    submit() {
        const formData = this.userForm.value;

        if (!this.isEditMode && formData.password !== formData.confirmPassword) {
            this.toastr.error('Las contraseñas no coinciden', 'Error');
            return;
        }
        if (this.isEditMode) {
            delete formData.password;
            delete formData.confirmPassword;
        }
        if (this.isEditMode) {
            this.updateUser(formData);
        } else {
            this.checkUserExists(formData.identification).subscribe(exists => {
                if (exists) {
                    this.toastr.error('Ya existe un usuario con ese número de documento.', 'Error');
                } else {
            this.createUser(formData);
                }
            }, error => {
                console.error('Error al verificar el usuario:', error);
                this.toastr.error('Ocurrió un error al verificar el paciente.', 'Error');
            });
        }
    }

    /**
     * Verifica si un usuario ya existe en el sistema.
     *
     * @param {number} identification - Número de identificación del usuario
     * @returns Observable que emite true si el usuario existe, false en caso contrario
     * @author Nelson García
     */
    checkUserExists(identification: number) {
        return this.userService.checkUserExists(identification);
    }


    getUser() {
        this.userService.showUser(this.id)
            .subscribe(response => {
                // No incluir password en el patchValue
                const { password, ...userData } = response;
                this.userForm.patchValue(userData);
            });
    }



    updateUser(form_value: any) {
        form_value._method = 'PUT';

        this.userService.updateUser(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/users/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar el paciente', 'Error');
                }
            });
    }
}
