import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../services/speciality.service';
import Swal from 'sweetalert2';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

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
    specialities: any[] = [];

    /**
     * Constructor del componente.
     * @param specialityService Servicio para gestionar las especialidades médicas.
     * @param toastr Servicio para mostrar notificaciones.
     */
    constructor(
        private specialityService: SpecialityService,
        private toastr: ToastrService
        ) { }

    /**
     * Método de inicialización del componente.
     * Se ejecuta una vez que el componente se ha creado.
     */
    ngOnInit() {
        this.isLoading = true;
        this.getSpecialities()
    }

    /**
     * Obtiene la lista de especialidades médicas del servicio.
     */
    getSpecialities(){
        this.specialityService.getSpecialities().subscribe((data) => {
            this.specialities = data;
            this.isLoading = false;
        });
    }

    /**
     * Eliminar una especialidad médica.
     * @param id Id de la especialidad médica.
     */
    deleteSpeciality(id: string) {
        this.specialityService.deleteSpeciality(id).subscribe({
            next: (response) => {
                this.getSpecialities();
                this.toastr.success(response.message, 'Muy bien');            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar la especialidad médica', 'Error');
            }
        });
    }

    /**
     * Muestra un cuadro de diálogo de confirmación antes de eliminar uns especialidad médica.
     * @param speciality La especialidad médica a eliminar.
     */
    questionDeleteSpeciality(speciality: any) {
        Swal.fire({
            title: '¿Eliminar?',
            text: `¿Está seguro de eliminar ls especialidad médica ${speciality.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                this.deleteSpeciality(speciality._id);
            }
        });
    }

}
