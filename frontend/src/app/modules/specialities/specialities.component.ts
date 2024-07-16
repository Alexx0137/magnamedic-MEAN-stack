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
    templateUrl: './specialities.component.html',
    styleUrl: './specialities.component.css'
})
export class SpecialitiesComponent {


}
