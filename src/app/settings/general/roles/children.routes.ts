import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home').then(m => m.Home)
    },
    {
        path: ':id',
        loadComponent: () => import('./actions/actions').then(m => m.Actions)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
