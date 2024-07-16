import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations' ;
import {ToastrModule} from 'ngx-toastr' ;

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        RouterOutlet,
        BrowserAnimationsModule,
        ToastrModule
    ],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.css'
})
export class PatientsComponent {

}
