import { Routes } from '@angular/router';
import {authGuard} from "../../guards/auth.guard";

const Routing: Routes = [
    {
        path: 'patients',
        loadChildren: () => import('../patients/patients.routes').then(m => m.routes),
        canActivate: [authGuard]
    },
    {
        path: 'doctors',
        loadChildren: () => import('../doctors/doctors.routes').then(m => m.default),
        canActivate: [authGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('../users/users.routes').then(m => m.default),canActivate: [authGuard]
    },
    {
        path: 'appointments',
        loadChildren: () => import('../appointments/appointments.routes').then(m => m.default),
        canActivate: [authGuard]
    },
    {
        path: 'specialities',
        loadChildren: () => import('../specialities/specialities.routes').then(m => m.default),
        canActivate: [authGuard]
    },

    {
        path: '**',
        redirectTo: 'error/404',
    },
];

export { Routing };
