import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Jobs } from './jobs/jobs';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
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
