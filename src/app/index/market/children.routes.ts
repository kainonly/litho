import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  {
    path: 'products',
    data: {
      breadcrumb: `商品调控`
    },
    loadComponent: () => import('./products/products').then(m => m.Products)
  },
  {
    path: 'orders',
    data: {
      breadcrumb: `市场订单`
    },
    loadComponent: () => import('./orders/orders').then(m => m.Orders)
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];
