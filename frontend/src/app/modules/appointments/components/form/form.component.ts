import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppointmentService } from "../../services/appointment.service";
import { ToastrService } from 'ngx-toastr';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { DoctorService } from "../../../doctors/services/doctor.service";
import { SpecialityService } from "../../../specialities/services/speciality.service";
import { PatientService } from "../../../patients/services/patient.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        FormsModule,
        NgSelectModule
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
    filteredDoctors: any[] = [];
    specialities: any[] = [];
    patients: any[] = [];
    filteredPatients: any[] = [];
    minDate: string = '';
    minTime: string = '07:00';
    maxTime: string = '18:00';

    constructor(
        private appointmentService: AppointmentService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
        private patientService: PatientService,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getDoctors();
        this.getSpecialities();
        this.getPatients();
        this.filteredPatients = this.patients;

        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];

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
            patient_id: ['', Validators.required],
            speciality_id: ['', Validators.required],
            doctor_id: ['', Validators.required],
            date: ['', [Validators.required]],
            time: ['', [Validators.required, this.timeValidator.bind(this)]],
            state: [1, Validators.required],
            observations: ['', Validators.required]
        });
    }

    timeValidator(control: AbstractControl): ValidationErrors | null {
        const time = control.value;
        if (!time) return null;

        const [hours, minutes] = time.split(':').map(Number);
        const timeValue = hours * 60 + minutes;
        const minTimeValue = 7 * 60;
        const maxTimeValue = 18 * 60;

        if (timeValue < minTimeValue || timeValue > maxTimeValue) {
            return { outOfRange: true };
        }
        return null;
    }

    createAppointment(data: any): void {
        this.appointmentService.createAppointment(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/appointments/list']);
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
                    void this.router.navigateByUrl('/appointments/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar la cita médica', 'Error');
                }
            });
    }

    getDoctors() {
        this.doctorService.getDoctors().subscribe((data) => {
            this.doctors = data;
        });
    }

    getSpecialities() {
        this.specialityService.getSpecialities().subscribe((data) => {
            this.specialities = data;
        });
    }

    getPatients() {
        this.patientService.getPatients().subscribe((data) => {
            this.patients = data;
            this.filteredPatients = data;
        });
    }

    onSpecialityChange(event: any) {
        const selectedSpecialityId = event.target.value;
        this.filteredDoctors = this.doctors.filter(doctor => doctor.speciality_id === selectedSpecialityId);
    }

    onPatientChange(selectedPatientId: string) {
        const selectedPatient = this.patients.find(patient => patient._id === selectedPatientId);
        if (selectedPatient) {
            this.appointmentForm.patchValue({
                patient_id: selectedPatientId,  // Guarda el ID del paciente
                last_name: selectedPatient.last_name,
                identification: selectedPatient.identification,
                identification_type_id: selectedPatient.identification_type_id,
            });
        }
    }
}
