import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/user';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        NgOptimizedImage
    ],
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    userId: string | null = null;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.getUserId();

        if (this.userId) {
            this.userService.showUser(this.userId).subscribe({
                next: (userData) => {
                    this.user = userData;
                },
                error: (error) => {
                    console.error('Error fetching user:', error);
                }
            });
        }
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
}
