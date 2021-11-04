import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { OrderComponent } from './order.component';
import { OrderService } from './order.service';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [OrderComponent],
  providers: [OrderService]
})
export class OrderModule {}
