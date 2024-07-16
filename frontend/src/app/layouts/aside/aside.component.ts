import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-aside',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.css'
})
export class AsideComponent {

}
