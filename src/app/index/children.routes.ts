import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'market',
    data: {
      breadcrumb: `市场`
    },
    loadChildren: () => import('./market/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: `工作台`
    },
    loadChildren: () => import('./dashboard/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
