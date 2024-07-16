import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-doctors',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

}
