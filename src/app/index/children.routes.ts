import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'market',
    loadChildren: () => import('./market/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
