import { Routes } from '@angular/router';

import { Analysis } from './analysis/analysis';
import { appGuard } from './app.guard';
import { appResolver } from './app.resolver';
import { Business } from './business/business';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Ops } from './ops/ops';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    canActivate: [appGuard],
    resolve: {
      layout: appResolver
    },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'ops', component: Ops },
      { path: 'business', component: Business },
      { path: 'analysis', component: Analysis },
      {
        path: 'system',
        loadComponent: () => import('./system/system').then(m => m.Settings),
        loadChildren: () => import('./system/children.routes').then(m => m.childrenRoutes)
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
