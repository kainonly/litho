import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'org',
    data: {
      breadcrumb: `组织架构`
    },
    loadChildren: () => import('./org/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'org', pathMatch: 'full' }
];
