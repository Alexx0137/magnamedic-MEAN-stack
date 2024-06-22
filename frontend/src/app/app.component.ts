import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PatientsComponent} from "./modules/patients/patients.component";
import {AsideComponent} from "./dashboard/layouts/aside/aside.component";
import {NavbarComponent} from "./dashboard/layouts/navbar/navbar.component";
import {FooterComponent} from "./dashboard/layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientsComponent, AsideComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
