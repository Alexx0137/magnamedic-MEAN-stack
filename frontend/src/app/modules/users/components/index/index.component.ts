import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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
    users: any[] = [];

    /**
     * Constructor del componente.
     * @param userService Servicio para gestionar los usuarios.
     * @param toastr Servicio para mostrar notificaciones.
     */
    constructor(
        private userService: UserService,
        private toastr: ToastrService
        ) { }

    /**
     * Método de inicialización del componente.
     * Se ejecuta una vez que el componente se ha creado.
     */
    ngOnInit() {
        this.isLoading = true;
        this.getUsers()
    }

    /**
     * Obtiene la lista de usuarios del servicio.
     */
    getUsers(){
        this.userService.getUsers().subscribe((data) => {
            this.users = data;
            this.isLoading = false;
        });
    }

    /**
     * Eliminar un usuario.
     * @param id Id del usuario.
     */
    deleteUser(id: string) {
        this.userService.deleteUser(id).subscribe({
            next: (response) => {
                this.getUsers();
                this.toastr.success(response.message, 'Muy bien');            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar el usuario', 'Error');
            }
        });
    }

    /**
     * Muestra un cuadro de diálogo de confirmación antes de eliminar un usuario.
     * @param user El usuario a eliminar.
     */
    questionDeleteUser(user: any) {
        Swal.fire({
            title: '¿Eliminar?',
            text: `¿Está seguro de eliminar el usuario ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                this.deleteUser(user._id);
            }
        });
    }

}
