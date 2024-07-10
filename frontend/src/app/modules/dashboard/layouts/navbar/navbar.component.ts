import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

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
    constructor(private router: Router) {} // Inject the router

    openSettingsModal() {
        // Logic to open your settings modal (e.g., using a modal service)
    }

    logout() {
        // Call your authentication service's logout method
        this.router.navigate(['/login']); // Navigate to login after logout
    }
}
