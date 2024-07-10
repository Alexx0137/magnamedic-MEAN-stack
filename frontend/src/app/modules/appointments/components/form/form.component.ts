import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppointmentService} from "../../services/appointment.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {DoctorService} from "../../../doctors/services/doctor.service";
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

    appointmentForm!: FormGroup;
    public id: any = null;
    isEditMode = false;
    doctors: any[] = [];
    specialities: any[] = [];

    constructor(
        private appointmentService: AppointmentService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private doctorService: DoctorService,
        private specialityService: SpecialityService
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getDoctors();
        this.getSpecialities();

        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.isEditMode = !!this.id;

            if (this.isEditMode) {
                this.getAppointment();
            }
        });
    }

    initForm(): void {
        this.appointmentForm = this.formBuilder.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            identification: ['', Validators.required],
            speciality_id: ['', Validators.required],
            doctor_id: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required],
            observations: ['', Validators.required],
        });
    }

    createAppointment(data: any): void {
        this.appointmentService.createAppointment(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/dashboard/appointments/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear la cita médica', 'Error');
                }
            });
    }

    submit() {
        const formData = this.appointmentForm.value;

        if (this.isEditMode) {
            this.updateAppointment(formData);
        } else {
            this.createAppointment(formData);
        }
    }

    getAppointment() {
        this.appointmentService.showAppointment(this.id)
            .subscribe(response => {
                if (response.birth_date) {
                    response.birth_date = response.birth_date.slice(0, 10);
                }
                this.appointmentForm.patchValue(response);
            });
    }

    updateAppointment(form_value: any) {
        form_value._method = 'PUT';

        this.appointmentService.updateAppointment(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/dashboard/appointments/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar la cita médica', 'Error');
                }
            });
    }

    /**
     * Obtiene la lista de doctores del servicio.
     */
    getDoctors() {
        this.doctorService.getDoctors().subscribe((data) => {
            this.doctors = data;
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
