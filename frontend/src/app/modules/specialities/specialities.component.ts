import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations' ;
import {ToastrModule} from 'ngx-toastr' ;
import {AsideComponent} from "../dashboard/layouts/aside/aside.component";
import {FooterComponent} from "../dashboard/layouts/footer/footer.component";
import {NavbarComponent} from "../dashboard/layouts/navbar/navbar.component";

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
        AsideComponent,
        FooterComponent,
        NavbarComponent
    ],
    templateUrl: './specialities.component.html',
    styleUrl: './specialities.component.css'
})
export class SpecialitiesComponent {


}
