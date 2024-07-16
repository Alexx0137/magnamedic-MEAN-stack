import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AsideComponent} from "./aside/aside.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        AsideComponent,
        NavbarComponent,
        FooterComponent,
        RouterOutlet,
        AsideComponent,
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
