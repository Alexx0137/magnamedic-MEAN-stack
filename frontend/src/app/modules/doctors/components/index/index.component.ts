import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import Swal from 'sweetalert2';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {SpecialityService} from "../../../specialities/services/speciality.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    public isLoading: boolean = false;
    doctors: any[] = [];
    specialities: any[] = [];


    constructor(
        private doctorService: DoctorService,
        private toastr: ToastrService,
        private specialityService: SpecialityService


    ) { }

    /**
     * Método de inicialización del componente.
     * Se ejecuta una vez que el componente se ha creado.
     */
    ngOnInit() {
        this.isLoading = true;
        this.getDoctors();
        this.loadSpecialities();
    }

    /**
     * Obtiene la lista de doctores del servicio.
     */
    getDoctors(){
        this.doctorService.getDoctors().subscribe((data) => {
            this.doctors = data;
            this.isLoading = false;
        });
    }

    /**
     * Eliminar un doctor.
     * @param id Id del doctor.
     */
    deleteDoctor(id: string) {
        this.doctorService.deleteDoctor(id).subscribe({
            next: (response) => {
                this.getDoctors();
                this.toastr.success(response.message, 'Muy bien');            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar el médico', 'Error');
            }
        });
    }

    /**
     * Muestra un cuadro de diálogo de confirmación antes de eliminar un doctor.
     * @param doctor El doctor a eliminar.
     */
    questionDeleteDoctor(doctor: any) {
        Swal.fire({
            title: '¿Eliminar?',
            text: `¿Está seguro de eliminar el médico ${doctor.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                this.deleteDoctor(doctor._id);
            }
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

}
