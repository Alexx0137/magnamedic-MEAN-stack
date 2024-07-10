import {Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./components/index/index.component').then(m => m.IndexComponent)

    },
    {
        path: 'form',
        loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent)

    },
    {
        path: 'forgot-password/:id',
        loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent)

    },

]

export default routes;

