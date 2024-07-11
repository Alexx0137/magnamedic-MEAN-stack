import {Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./modules/auth/components/register/register.component";

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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/dashboard/dashboard.routes').then(m => m.routes),
        canActivate: [authGuard]
    }
];

export class AppRoutes {
}
