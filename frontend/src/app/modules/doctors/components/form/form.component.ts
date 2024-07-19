import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DoctorService} from "../../services/doctor.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {of, switchMap} from "rxjs";
import {Doctor} from "../../../../models/doctor";
import {SpecialityService} from "../../../specialities/services/speciality.service";

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ],
    providers: [DatePipe],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    doctorForm!: FormGroup;
    public id: any = null;
    isEditMode = false;
    specialities: any[] = [];

    constructor(
        private doctorService: DoctorService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private specialityService: SpecialityService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getSpecialities();

        this.route.paramMap.pipe(
            switchMap(params => {
                this.id = params.get('id');
                this.isEditMode = !!this.id;

                if (this.isEditMode) {
                    return this.doctorService.showDoctor(this.id);
                } else {
                    return of(null);
                }
            })
        ).subscribe({
            next: (doctor: Doctor | null) => {
                if (doctor) {
                    const formattedBirthDate = this.datePipe.transform(doctor._birthDate, 'yyyy-MM-dd');

                    this.doctorForm.patchValue({
                        ...doctor,
                        birth_date: formattedBirthDate,
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching doctor:', error);
                this.toastr.error('Hubo un error al obtener el paciente', 'Error');
            }
        });
    }

    initForm(): void {
        this.doctorForm = this.formBuilder.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            identification: ['', Validators.required],
            gender_id: ['', Validators.required],
            address: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            speciality_id: ['', [Validators.required]],
            professional_card: ['', [Validators.required]],
            birth_date: [null],
            state: [true, [Validators.required]],
        });
    }

    createDoctor(data: any): void {
        this.doctorService.createDoctor(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/doctors/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear el paciente', 'Error');
                }
            });
    }

    submit() {
        const formData = this.doctorForm.value;

        if (this.isEditMode) {
            this.updateDoctor(formData);
        } else {
            this.checkDoctorExists(formData.identification).subscribe(exists => {
                if (exists) {
                    this.toastr.error('Ya existe un médico con ese número de documento.', 'Error');
                } else {
                this.createDoctor(formData);
                }
            }, error => {
                console.error('Error al verificar el médico:', error);
                this.toastr.error('Ocurrió un error al verificar el médico.', 'Error');
            });
        }
    }

    checkDoctorExists(identification: number) {
        return this.doctorService.checkDoctorExists(identification);
    }

    getDoctor() {
        this.doctorService.showDoctor(this.id)
            .subscribe(response => {
                console.log("paciente", response);
                if (response.birth_date) {
                    response.birth_date = response.birth_date.slice(0, 10);
                }
                this.doctorForm.patchValue(response);
            });
    }

    updateDoctor(form_value: any) {
        form_value._method = 'PUT';

        this.doctorService.updateDoctor(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/doctors/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar el paciente', 'Error');
                }
            });
    }
    /**
     * Obtiene la lista de las especialidades médicas del servicio.
     */
    getSpecialities() {
        this.specialityService.getSpecialities().subscribe((data) => {
            this.specialities = data;
        });
    }
}
