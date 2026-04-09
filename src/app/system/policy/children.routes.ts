import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: '', redirectTo: 'resources', pathMatch: 'full' },
  {
    path: 'resources',
    data: {
      breadcrumb: `资源管理`
    },
    loadComponent: () => import('./resources/resources').then(m => m.Resources),
    loadChildren: () => import('./resources/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'views',
    data: {
      breadcrumb: `视图管理`
    },
    loadComponent: () => import('./views/views').then(m => m.Views),
    loadChildren: () => import('./views/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'permissions',
    data: {
      breadcrumb: `权限管理`
    },
    loadComponent: () => import('./permissions/permissions').then(m => m.Permissions)
  }
];
