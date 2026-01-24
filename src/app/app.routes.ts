import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { Customers } from './customers/customers';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Orders } from './orders/orders';
import { Products } from './products/products';
import { Settings } from './settings/settings';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    canActivate: [appGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders },
      { path: 'customers', component: Customers },
      { path: 'settings', component: Settings },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
