import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { CoreModule, CoreRoutes } from './skeleton/core.module';
import { CmsModule, CmsRoutes } from './skeleton/cms.module';
import { DashboardsComponent, DashboardsModule } from 'van-skeleton/dashboards';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'empty',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      ...CoreRoutes,
      ...CmsRoutes,
      {
        path: 'page/:key',
        loadChildren: () => import('./pages/page/page.module').then(m => m.PageModule)
      },
      {
        path: 'shop-index',
        loadChildren: () => import('./pages/shop-index/shop-index.module').then(m => m.ShopIndexModule)
      },
      {
        path: 'shop-add',
        loadChildren: () => import('./pages/shop-add/shop-add.module').then(m => m.ShopAddModule)
      },
      {
        path: 'shop-edit/:id',
        loadChildren: () => import('./pages/shop-edit/shop-edit.module').then(m => m.ShopEditModule)
      },
      {
        path: 'product-index/:sid',
        loadChildren: () => import('./pages/product-index/product-index.module').then(m => m.ProductIndexModule)
      },
      {
        path: 'product-add/:sid',
        loadChildren: () => import('./pages/product-add/product-add.module').then(m => m.ProductAddModule)
      },
      {
        path: 'product-edit/:sid/:id',
        loadChildren: () => import('./pages/product-edit/product-edit.module').then(m => m.ProductEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    DashboardsModule,
    CoreModule,
    CmsModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRouterModule {
}
