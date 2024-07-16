import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {Routing} from "../modules/dashboard/routing";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: Routing
    }
];
