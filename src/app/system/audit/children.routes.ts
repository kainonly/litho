import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
    { path: '', redirectTo: 'sessions', pathMatch: 'full' },
    {
        path: 'sessions',
        loadComponent: () => import('./sessions/sessions').then(m => m.Sessions)
    },
    {
        path: 'logins',
        loadComponent: () => import('./logins/logins').then(m => m.Logins)
    },
    {
        path: 'behaviors',
        loadComponent: () => import('./behaviors/behaviors').then(m => m.Behaviors)
    }
];
