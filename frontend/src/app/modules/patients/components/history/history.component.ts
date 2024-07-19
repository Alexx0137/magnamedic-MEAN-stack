import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../appointments/services/appointment.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DoctorService} from "../../../doctors/services/doctor.service";
import {SpecialityService} from "../../../specialities/services/speciality.service";

@Component({
  selector: 'app-history',
  standalone: true,
    imports: [
        RouterLink,
        NgClass,
        NgIf,
        NgForOf,
        DatePipe
    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
    patientId: string | null = null;
    appointments: any[] = [];
    doctors: any[] = [];
    specialities: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private appointmentService: AppointmentService,
        private doctorService: DoctorService,
        private specialityService: SpecialityService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.patientId = params['id'];
            this.getAppointments();
            this.loadDoctors();
            this.loadSpecialities();
        });
    }

    getAppointments(): void {
        if (this.patientId) {
            this.appointmentService.getAppointmentsByPatient(this.patientId).subscribe(data => {
                this.appointments = data;
            });
        }
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

    getSpecialityName(specialityId: string): string {
        const speciality = this.specialities.find(s => s._id === specialityId);
        return speciality ? speciality.name : 'Desconocida';
    }

    getDoctorName(doctorId: string): string {
        const doctor = this.doctors.find(d => d._id === doctorId);
        return doctor ? `${doctor.name} ${doctor.last_name}` : 'Desconocido';
    }

    getAppointmentState(state: number): string {
        switch (state) {
            case 1:
                return 'Pendiente';
            case 2:
                return 'Atendida';
            case 3:
                return 'Cancelada';
            default:
                return 'Desconocido';
        }
    }
}
