import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AsideComponent} from "../dashboard/layouts/aside/aside.component";
import {FooterComponent} from "../dashboard/layouts/footer/footer.component";
import {NavbarComponent} from "../dashboard/layouts/navbar/navbar.component";

@Component({
  selector: 'app-doctors',
  standalone: true,
    imports: [
        RouterOutlet,
        AsideComponent,
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

}
