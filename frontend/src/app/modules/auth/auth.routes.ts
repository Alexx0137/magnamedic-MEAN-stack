import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            }
        ],
    },
];

export default routes;
