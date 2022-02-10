import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxTableModule } from '@weplanx/components/table';

import { OrdersService } from './orders.service';
import { TableComponent } from './table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxTableModule, RouterModule.forChild(routes)],
  declarations: [TableComponent],
  providers: [OrdersService]
})
export class TableModule {}
