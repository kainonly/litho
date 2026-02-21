import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
    { path: '', redirectTo: 'resources', pathMatch: 'full' },
    {
        path: 'resources',
        loadComponent: () => import('./resources/resources').then(m => m.Resources),
        loadChildren: () => import('./resources/children.routes').then(m => m.childrenRoutes)
    },
    {
        path: 'views',
        loadComponent: () => import('./views/views').then(m => m.Views),
        loadChildren: () => import('./views/children.routes').then(m => m.childrenRoutes)
    },
    {
        path: 'permissions',
        loadComponent: () => import('./permissions/permissions').then(m => m.Permissions)
    }
];
