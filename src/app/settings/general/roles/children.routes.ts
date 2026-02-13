import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home').then(m => m.Home)
  },
  {
    path: ':id/views',
    loadComponent: () => import('./views/views').then(m => m.Views)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
