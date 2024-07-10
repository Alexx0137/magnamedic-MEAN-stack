import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations' ;
import {ToastrModule} from 'ngx-toastr' ;
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        RouterOutlet,
        BrowserAnimationsModule,
        ToastrModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {


}
