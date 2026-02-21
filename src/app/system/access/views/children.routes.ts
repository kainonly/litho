import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home').then(m => m.Home)
  },
  {
    path: ':nav',
    loadComponent: () => import('./routes/routes').then(m => m.Routes)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
