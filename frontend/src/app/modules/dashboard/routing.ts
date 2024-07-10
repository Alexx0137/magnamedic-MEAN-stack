import { Routes } from '@angular/router';

const Routing: Routes = [
    {
        path: 'patients',
        loadChildren: () => import('../patients/patients.routes').then(m => m.routes),
    },
    {
        path: 'doctors',
        loadChildren: () => import('../doctors/doctors.routes').then(m => m.default),
    },
    {
        path: 'users',
        loadChildren: () => import('../users/users.routes').then(m => m.default),
    },
    {
        path: 'appointments',
        loadChildren: () => import('../appointments/appointments.routes').then(m => m.default),
    },
    {
        path: 'specialities',
        loadChildren: () => import('../specialities/specialities.routes').then(m => m.default),
    },

    {
        path: '**',
        redirectTo: 'error/404',
    },
];

export { Routing };
