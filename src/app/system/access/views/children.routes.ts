import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: ':nav',
    loadComponent: () => import('./routes/routes').then(m => m.Routes)
  },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];
