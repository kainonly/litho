import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'general',
    loadChildren: () => import('./general/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'access',
    loadChildren: () => import('./access/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'general', pathMatch: 'full' }
];
