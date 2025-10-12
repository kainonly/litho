import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { Jobs } from './jobs/jobs';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    canActivate: [appGuard],
    children: [
      { path: 'jobs', component: Jobs },
      { path: '', redirectTo: '/jobs', pathMatch: 'full' }
    ]
  }
];
