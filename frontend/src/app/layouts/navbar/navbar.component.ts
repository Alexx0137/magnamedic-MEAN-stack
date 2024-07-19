import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserService} from "../../modules/users/services/user.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        NgIf
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    user: User | null = null;
    userId: string | null = null;
    role: string | null = null;

    private authService = inject(AuthService);


    constructor(
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();

        if (this.userId) {
            this.userService.showUser(this.userId).subscribe({
                next: (userData) => {
                    this.user = userData;
                    if (userData.role) {
                        const roleNumber = parseInt(userData.role, 10);
                        this.role = this.getRole(roleNumber);
                    }
                },
                error: (error) => {
                    console.error('Error fetching user:', error);
                }
            });
        }
    }


    onLogout() {
        this.authService.logout();
    }


    getRole(state: number): string {
        switch (state) {
            case 1:
                return 'Administrador';
            case 2:
                return 'Doctor';
            case 3:
                return 'Recepcionista';
            default:
                return 'Desconocido';
        }
    }
}
