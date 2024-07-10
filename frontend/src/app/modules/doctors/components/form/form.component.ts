import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DoctorService} from "../../services/doctor.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgIf} from "@angular/common";
import {of, switchMap} from "rxjs";
import {Doctor} from "../../../../models/doctor";

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

    doctorForm!: FormGroup;
    public id: any = null;
    isEditMode = false;

    constructor(
        private doctorService: DoctorService,
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
            blood_type_id: ['', Validators.required],
            eps: ['', Validators.required],
            address: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            medical_speciality: ['', [Validators.required]],
            professional_card: ['', [Validators.required]],
            birth_date: [null],
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
            this.createDoctor(formData);
        }
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
}
