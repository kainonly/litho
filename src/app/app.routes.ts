import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { Account } from './account/account';
import { Analytics } from './analytics/analytics';
import { Customers } from './customers/customers';
import { Dashboard } from './dashboard/dashboard';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Login } from './login/login';
import { Notifications } from './notifications/notifications';
import { Orders } from './orders/orders';
import { Products } from './products/products';
import { Profile } from './profile/profile';
import { Settings } from './settings/settings';

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
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders },
      { path: 'customers', component: Customers },
      { path: 'analytics', component: Analytics },
      { path: 'settings', component: Settings },
      { path: 'notifications', component: Notifications },
      { path: 'profile', component: Profile },
      { path: 'account', component: Account },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
