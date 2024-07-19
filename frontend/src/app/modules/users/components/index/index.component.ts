import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {User} from "../../../../models/user";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        NgClass
    ],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    public isLoading: boolean = false;
    users: User[] = [];

    /**
     * Constructor del componente.
     * @param userService Servicio para gestionar los usuarios.
     * @param toastr Servicio para mostrar notificaciones.
     */
    constructor(
        private userService: UserService,
        private toastr: ToastrService
    ) {
    }

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
    getUsers() {
        this.userService.getUsers().subscribe({
            next: (data: User[]) => {
                this.users = data.map((user: User) => ({
                    ...user,
                    roleName: this.getRoleName(user.role)
                }));
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error al obtener la lista de usuarios:', error);
                this.toastr.error('Error al obtener la lista de usuarios', 'Error');
                this.isLoading = false;
            }
        });
    }


    /**
     * Obtiene el nombre del rol a partir del id del rol.
     * @param roleId Id del rol.
     * @returns Nombre del rol.
     */
    getRoleName(roleId: string): string {
        switch (roleId) {
            case '1':
                return 'Administrador';
            case '2':
                return 'Doctor';
            case '3':
                return 'Recepcionista';
            default:
                return 'Desconocido';
        }
    }


    /**
     * Eliminar un usuario.
     * @param id Id del usuario.
     */
    deleteUser(id
                   :
                   string
    ) {
        this.userService.deleteUser(id).subscribe({
            next: (response) => {
                this.getUsers();
                this.toastr.success(response.message, 'Muy bien');
            },
            error: () => {
                this.toastr.error('Hubo un error al eliminar el usuario', 'Error');
            }
        });
    }

    /**
     * Muestra un cuadro de diálogo de confirmación antes de eliminar un usuario.
     * @param user El usuario a eliminar.
     */
    questionDeleteUser(user
                           :
                           any
    ) {
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
