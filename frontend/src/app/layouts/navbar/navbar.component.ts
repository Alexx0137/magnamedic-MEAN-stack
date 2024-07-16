import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    userName: string | null = null;
    userLastName: string | null = null;

    private authService = inject(AuthService);


    constructor(private router: Router) {}

    ngOnInit() {
        this.userName = localStorage.getItem('name');
        this.userLastName = localStorage.getItem('last_name');
    }



    openSettingsModal() {

    }

    onLogout() {
        this.authService.logout();
    }
}
