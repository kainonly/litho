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
    data: {
      breadcrumb: `安全策略`
    },
    loadChildren: () => import('./policy/children.routes').then(m => m.childrenRoutes)
  },
  {
    path: 'audit',
    data: {
      breadcrumb: `审计日志`
    },
    loadChildren: () => import('./audit/children.routes').then(m => m.childrenRoutes)
  },
  { path: '', redirectTo: 'org', pathMatch: 'full' }
];
