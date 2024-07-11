import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

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
    private authService = inject(AuthService);


    constructor(private router: Router) {}

    openSettingsModal() {

    }

    onLogout() {
        this.authService.logout();
    }
}
