import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'dashboard',
    data: {
      breadcrumb: `仪表盘`
    },
    loadChildren: () => import('./dashboard/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'market',
    data: {
      breadcrumb: `交易大厅`
    },
    loadChildren: () => import('./market/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
