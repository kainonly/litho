import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { appResolver } from './app.resolver';
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
      {
        path: 'index',
        data: {
          breadcrumb: '工作站'
        },
        loadComponent: () => import('./index/index').then(m => m.Index),
        loadChildren: () => import('./index/children.routes').then(m => m.childrenRoutes)
      },
      {
        path: 'business',
        data: {
          breadcrumb: '实验对象'
        },
        loadComponent: () => import('./business/business').then(m => m.Business)
      },
      {
        path: 'analysis',
        data: {
          breadcrumb: '实验报表'
        },
        loadComponent: () => import('./analysis/analysis').then(m => m.Analysis)
      },
      {
        path: 'system',
        data: {
          breadcrumb: '系统设置'
        },
        loadComponent: () => import('./system/system').then(m => m.Settings),
        loadChildren: () => import('./system/children.routes').then(m => m.childrenRoutes)
      },
      { path: '', redirectTo: '/index', pathMatch: 'full' }
    ]
  }
];
