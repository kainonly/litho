import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    data: {
      breadcrumb: `数据概览`
    },
    loadComponent: () => import('./overview/overview').then(m => m.Overview)
  },
  {
    path: 'statistics',
    data: {
      breadcrumb: `统计分析`
    },
    loadComponent: () => import('./statistics/statistics').then(m => m.Statistics)
  }
];
