import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TableComponent } from './table.component';
import { OrdersService } from '../orders.service';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TableComponent],
  providers: [OrdersService]
})
export class TableModule {}
