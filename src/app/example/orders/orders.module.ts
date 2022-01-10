import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OrdersComponent],
  providers: [OrdersService]
})
export class OrdersModule {}
