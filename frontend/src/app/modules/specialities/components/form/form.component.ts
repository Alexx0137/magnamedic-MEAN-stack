import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpecialityService} from "../../services/speciality.service";
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

    specialityForm!: FormGroup;
    public id: any = null;
    isEditMode = false;

    constructor(
        private specialityService: SpecialityService,
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
                this.getSpeciality();
            }
        });
    }

    initForm(): void {
        this.specialityForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            consulting_room: ['', Validators.required],
        });
    }

    createSpeciality(data: any): void {
        this.specialityService.createSpeciality(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/specialities/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear el especialidad médica', 'Error');
                }
            });
    }

    submit() {
        const formData = this.specialityForm.value;

        if (this.isEditMode) {
            this.updateSpeciality(formData);
        } else {
            this.checkCodeExists(formData.code).subscribe(exist => {
                if (exist) {
                    this.toastr.error('Ya existe el código en la base de datos.', 'Error');
                } else {
                    this.createSpeciality(formData);
                }
            }, error => {
                console.error('Error al verificar el código:', error);
                this.toastr.error('Ocurrió un error al verificar el código.', 'Error');
            });
        }
    }

    /**
     * Verifica si un código ya existe en el sistema.
     *
     * @param {number} code - Código de la especialidad
     * @returns Observable que emite true si el código existe, false en caso contrario
     * @author Nelson García
     */
    checkCodeExists(code: number) {
        return this.specialityService.checkSpecialityCodeExists(code);
    }

    getSpeciality() {
        this.specialityService.showSpeciality(this.id)
            .subscribe(response => {
                if (response.birth_date) {
                    response.birth_date = response.birth_date.slice(0, 10);
                }
                this.specialityForm.patchValue(response);
            });
    }

    updateSpeciality(form_value: any) {
        form_value._method = 'PUT';

        this.specialityService.updateSpeciality(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/specialities/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar el especialidad médica', 'Error');
                }
            });
    }
}
