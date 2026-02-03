import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: 'general', redirectTo: 'general/orgs', pathMatch: 'full' },
  {
    path: 'general/orgs',
    loadComponent: () => import('./general/orgs/orgs').then(m => m.Orgs)
  },
  {
    path: 'general/roles',
    loadComponent: () => import('./general/roles/roles').then(m => m.Roles),
    loadChildren: () => import('./general/roles/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'general/users',
    loadComponent: () => import('./general/users/users').then(m => m.Users)
  },
  { path: 'access', redirectTo: 'access/resources', pathMatch: 'full' },
  {
    path: 'access/resources',
    loadComponent: () => import('./access/resources/resources').then(m => m.Resources),
    loadChildren: () => import('./access/resources/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'access/views',
    loadComponent: () => import('./access/views/views').then(m => m.Views),
    loadChildren: () => import('./access/views/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'access/permissions',
    loadComponent: () => import('./access/permissions/permissions').then(m => m.Permissions)
  },
  { path: 'audit', redirectTo: 'audit/sessions', pathMatch: 'full' },
  {
    path: 'audit/sessions',
    loadComponent: () => import('./audit/sessions/sessions').then(m => m.Sessions)
  },
  {
    path: 'audit/login-status',
    loadComponent: () => import('./audit/login-status/login-status').then(m => m.LoginStatus)
  },
  {
    path: 'audit/behaviors',
    loadComponent: () => import('./audit/behaviors/behaviors').then(m => m.Behaviors)
  },
  { path: '', redirectTo: 'general/orgs', pathMatch: 'full' }
];
