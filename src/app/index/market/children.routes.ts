import { Routes } from '@angular/router';

export const childrenRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./products/products').then(m => m.Products)
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders').then(m => m.Orders)
  }
];
