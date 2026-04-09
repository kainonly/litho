import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
    { path: '', redirectTo: 'sessions', pathMatch: 'full' },
    {
        path: 'sessions',
        data: {
            breadcrumb: `会话记录`
        },
        loadComponent: () => import('./sessions/sessions').then(m => m.Sessions)
    },
    {
        path: 'logins',
        data: {
            breadcrumb: `登录记录`
        },
        loadComponent: () => import('./logins/logins').then(m => m.Logins)
    },
    {
        path: 'behaviors',
        data: {
            breadcrumb: `行为记录`
        },
        loadComponent: () => import('./behaviors/behaviors').then(m => m.Behaviors)
    }
];
