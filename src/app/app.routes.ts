import { Routes } from '@angular/router';

import { Analysis } from './analysis/analysis';
import { appGuard } from './app.guard';
import { appResolver } from './app.resolver';
import { Business } from './business/business';
import { Index } from './index';
import { Login } from './login/login';

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
      { path: 'index', component: Index },
      { path: 'business', component: Business },
      { path: 'analysis', component: Analysis },
      {
        path: 'system',
        loadComponent: () => import('./system/system').then(m => m.Settings),
        loadChildren: () => import('./system/children.routes').then(m => m.childrenRoutes)
      },
      { path: '', redirectTo: '/index', pathMatch: 'full' }
    ]
  }
];
