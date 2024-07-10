// auth.routes.ts

import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from "./components/logout/logout.component"; // Si cambiaste el nombre

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: LogoutComponent,
            },
        ],
    },
];

export default routes;
