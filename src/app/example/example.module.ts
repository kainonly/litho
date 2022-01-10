import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxDynamicModule } from '@weplanx/components';

import { EmptyComponent } from './empty/empty.component';
import { ExampleComponent } from './example.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      { path: '', redirectTo: '/example/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, WpxDynamicModule, RouterModule.forChild(routes)],
  declarations: [ExampleComponent, EmptyComponent]
})
export class ExampleModule {}
