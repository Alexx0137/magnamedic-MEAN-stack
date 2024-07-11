import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import Swal from 'sweetalert2';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-index',
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
    patients: any[] = [];

    constructor(
        private patientService: PatientService,
        private toastr: ToastrService
        ) { }

    ngOnInit() {
        this.isLoading = true;
        this.getPatients()
    }

    /**
     * Obtener la lista de pacientes.
     *
     * @returns {void}
     * @author Nelson García
     */
    getPatients(): void {
        this.patientService.getPatients().subscribe((data) => {
            this.patients = data;
            this.isLoading = false;
        });
    }

    /**
     * Eliminar un paciente.
     *
     * @param {string} id - Id del paciente.
     * @returns {void}
     * @author Nelson García
     */
    deletePatient(id: string): void {
        this.patientService.deletePatient(id).subscribe({
            next: (response) => {
                this.getPatients();
                this.toastr.success(response.message, 'Muy bien');            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar el paciente', 'Error');
            }
        });
    }

    /**
     * Preguntar al usuario si desea eliminar un paciente.
     *
     * @param {any} patient - Datos del paciente.
     * @returns {void}
     * @author Nelson García
     */
    questionDeletePatient(patient: any): void {
        Swal.fire({
            title: '¿Eliminar?',
            text: `¿Está seguro de eliminar el paciente ${patient.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                this.deletePatient(patient._id);
            }
        });
    }

}
