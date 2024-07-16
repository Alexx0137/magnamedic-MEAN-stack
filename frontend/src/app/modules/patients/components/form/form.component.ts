import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientService} from "../../services/patient.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgIf} from "@angular/common";
import {of, switchMap} from "rxjs";
import {Patient} from "../../../../models/patient";

@Component({
    selector: 'app-form',
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
@Injectable({
    providedIn: 'root'
})
export class FormComponent implements OnInit {

    patientForm!: FormGroup;
    public id: any = null;
    isEditMode = false;

    constructor(
        private patientService: PatientService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.initForm();

        this.route.paramMap.pipe(
            switchMap(params => {
                this.id = params.get('id');
                this.isEditMode = !!this.id;

                if (this.isEditMode) {
                    return this.patientService.showPatient(this.id);
                } else {
                    return of(null);
                }
            })
        ).subscribe({
            next: (patient: Patient | null) => {
                if (patient) {
                    const formattedBirthDate = this.datePipe.transform(patient.birthDate, 'yyyy-MM-dd');

                    this.patientForm.patchValue({
                        ...patient,
                        birth_date: formattedBirthDate,
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching patient:', error);
                this.toastr.error('Hubo un error al obtener el paciente', 'Error');
            }
        });
    }

    initForm(): void {
        this.patientForm = this.formBuilder.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            identification: ['', Validators.required],
            gender_id: ['', Validators.required],
            blood_type_id: ['', Validators.required],
            eps: ['', Validators.required],
            address: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birth_date: [null],
        });
    }

    createPatient(data: any): void {
        this.patientService.createPatient(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/patients/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear el paciente', 'Error');
                }
            });
    }

    submit() {
        const formData = this.patientForm.value;

        if (this.isEditMode) {
            this.updatePatient(formData);
        } else {
            this.checkPatientExists(formData.identification).subscribe(exists => {
                if (exists) {
                    this.toastr.error('Ya existe un paciente con ese número de documento.', 'Error');
                } else {
                    this.createPatient(formData);
                }
            }, error => {
                console.error('Error al verificar el paciente:', error);
                this.toastr.error('Ocurrió un error al verificar el paciente.', 'Error');
            });
        }
    }

    checkPatientExists(identification: number) {
        return this.patientService.checkPatientExists(identification);
    }



    getPatient() {
        this.patientService.showPatient(this.id)
            .subscribe(response => {
                console.log("paciente", response);
                if (response.birth_date) {
                    response.birth_date = response.birth_date.slice(0, 10);
                }
                this.patientForm.patchValue(response);
            });
    }

    updatePatient(form_value: any) {
        form_value._method = 'PUT';

        this.patientService.updatePatient(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/patients/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar el paciente', 'Error');
                }
            });
    }
}
