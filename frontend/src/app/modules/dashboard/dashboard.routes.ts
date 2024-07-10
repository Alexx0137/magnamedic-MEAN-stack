import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Routing } from './routing';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: Routing
    }
];
