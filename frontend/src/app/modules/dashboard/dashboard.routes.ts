import {RouterModule, Routes} from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
    },
]

export default routes;
