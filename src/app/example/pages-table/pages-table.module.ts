import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxTableModule } from '@weplanx/ng/table';

import { OrdersService } from './orders.service';
import { PagesTableComponent } from './pages-table.component';

const routes: Routes = [
  {
    path: '',
    component: PagesTableComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxTableModule, RouterModule.forChild(routes)],
  declarations: [PagesTableComponent],
  providers: [OrdersService]
})
export class PagesTableModule {}
