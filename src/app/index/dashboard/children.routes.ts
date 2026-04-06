import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./overview/overview').then(m => m.Overview)
  },
  {
    path: 'statistics',
    loadComponent: () => import('./statistics/statistics').then(m => m.Statistics)
  }
];
