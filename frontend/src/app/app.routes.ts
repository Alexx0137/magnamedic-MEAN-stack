import {Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/dashboard/dashboard.routes').then(m => m.routes),
    }
];

export class AppRoutes {
}
