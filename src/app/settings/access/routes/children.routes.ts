import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home').then(m => m.Home)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
