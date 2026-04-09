import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'departments',
    data: {
      breadcrumb: `部门管理`
    },
    loadComponent: () => import('./departments/departments').then(m => m.Departments)
  },
  {
    path: 'roles',
    data: {
      breadcrumb: `权限组`
    },
    loadComponent: () => import('./roles/roles').then(m => m.Roles),
    loadChildren: () => import('./roles/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'users',
    data: {
      breadcrumb: `企业成员`
    },
    loadComponent: () => import('./users/users').then(m => m.Users)
  },
  { path: '', redirectTo: 'departments', pathMatch: 'full' }
];
