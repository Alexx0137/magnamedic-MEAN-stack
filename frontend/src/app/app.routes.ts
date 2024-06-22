import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.routes'),
    },
    {
        path: "patients",
        loadChildren: () => import('./modules/patients/patients.routes')
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];
