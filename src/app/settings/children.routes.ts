import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'orgs',
    loadComponent: () => import('./general/orgs/orgs').then(m => m.Orgs)
  },
  {
    path: 'roles',
    loadComponent: () => import('./general/roles/roles').then(m => m.Roles)
  },
  {
    path: 'users',
    loadComponent: () => import('./general/users/users').then(m => m.Users)
  },
  {
    path: 'resources',
    loadComponent: () => import('./access/resources/resources').then(m => m.Resources),
    loadChildren: () => import('./access/resources/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'routes',
    loadComponent: () => import('./access/routes/routes').then(m => m.SettingsRoutes)
  },
  {
    path: 'permissions',
    loadComponent: () => import('./access/permissions/permissions').then(m => m.Permissions)
  },
  {
    path: 'sessions',
    loadComponent: () => import('./audit/sessions/sessions').then(m => m.Sessions)
  },
  {
    path: 'login-status',
    loadComponent: () => import('./audit/login-status/login-status').then(m => m.LoginStatus)
  },
  {
    path: 'behaviors',
    loadComponent: () => import('./audit/behaviors/behaviors').then(m => m.Behaviors)
  },
  { path: '', redirectTo: 'orgs', pathMatch: 'full' }
];
