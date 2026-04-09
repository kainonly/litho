import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    data: {
      breadcrumb: `产品管理`
    },
    loadComponent: () => import('./products/products').then(m => m.Products)
  },
  {
    path: 'orders',
    data: {
      breadcrumb: `订单管理`
    },
    loadComponent: () => import('./orders/orders').then(m => m.Orders)
  }
];
