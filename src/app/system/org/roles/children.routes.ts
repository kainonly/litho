import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home').then(m => m.Home)
  },
  {
    path: ':id',
    loadComponent: () => import('./strategy/strategy').then(m => m.Strategy)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
