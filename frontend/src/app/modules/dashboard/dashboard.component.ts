import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AsideComponent} from "./layouts/aside/aside.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {FooterComponent} from "./layouts/footer/footer.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        AsideComponent,
        NavbarComponent,
        FooterComponent,
        RouterOutlet
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
