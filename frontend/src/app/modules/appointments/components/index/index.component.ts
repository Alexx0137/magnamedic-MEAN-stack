import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import Swal from 'sweetalert2';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {DoctorService} from "../../../doctors/services/doctor.service";
import {SpecialityService} from "../../../specialities/services/speciality.service";
import {PatientService} from "../../../patients/services/patient.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        DatePipe,
        NgClass
    ],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    public isLoading: boolean = false;
    appointments: any[] = [];
    doctors: any[] = [];
    specialities: any[] = [];
    patients: any[] = [];


    constructor(
        private appointmentService: AppointmentService,
        private toastr: ToastrService,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
        private patientService: PatientService
        ) { }

    /**
     * Método de inicialización del componente.
     * Se ejecuta una vez que el componente se ha creado.
     */
    ngOnInit() {
        this.isLoading = true;
        this.getAppointments();
        this.loadDoctors();
        this.loadSpecialities();
        this.loadPatients();
    }

    /**
     * Obtiene la lista de citas médicas del servicio.
     */
    getAppointments(){
        this.appointmentService.getAppointments().subscribe((data) => {
            this.appointments = data;
            this.isLoading = false;
        });
    }

    /**
     * Eliminar un cita médica.
     * @param id Id del cita médica.
     */
    deleteAppointment(id: string) {
        this.appointmentService.deleteAppointment(id).subscribe({
            next: (response) => {
                this.getAppointments();
                this.toastr.success(response.message, 'Muy bien');            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar la cita médica', 'Error');
            }
        });
    }

    /**
     * Muestra un cuadro de diálogo de confirmación antes de eliminar una cita médica.
     * @param appointment La cita médica a eliminar.
     */
    questionDeleteAppointment(appointment: any) {
        Swal.fire({
            title: '¿Eliminar?',
            text: `¿Está seguro de eliminar la cita médica ${appointment.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                this.deleteAppointment(appointment._id);
            }
        });
    }

    loadDoctors() {
        this.doctorService.getDoctors().subscribe((data: any[]) => {
            this.doctors = data;
        });
    }

    loadSpecialities() {
        this.specialityService.getSpecialities().subscribe((data: any[]) => {
            this.specialities = data;
        });
    }

    loadPatients() {
        this.patientService.getPatients().subscribe((data: any[]) => {
            this.patients = data;
        });
    }

    getDoctorName(doctorId: string): string {
        const doctor = this.doctors.find(d => d._id === doctorId);
        return doctor ? `${doctor.name} ${doctor.last_name}` : 'Desconocido';
    }

    getSpecialityName(specialityId: string): string {
        const speciality = this.specialities.find(s => s._id === specialityId);
        return speciality ? speciality.name : 'Desconocida';
    }

    getPatientName(patientId: string): string {
        const patient = this.patients.find(s => s._id === patientId);
        return patient ? patient.name : 'Desconocida';
    }
}
