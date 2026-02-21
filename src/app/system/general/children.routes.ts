import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
    { path: '', redirectTo: 'orgs', pathMatch: 'full' },
    {
        path: 'orgs',
        loadComponent: () => import('./orgs/orgs').then(m => m.Orgs)
    },
    {
        path: 'roles',
        loadComponent: () => import('./roles/roles').then(m => m.Roles),
        loadChildren: () => import('./roles/children.routes').then(m => m.childrenRoutes)
    },
    {
        path: 'users',
        loadComponent: () => import('./users/users').then(m => m.Users)
    }
];
