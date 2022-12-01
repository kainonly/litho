import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxTableModule } from '@weplanx/ng/table';

import { TableComponent } from './table.component';
import { TableService } from './table.service';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxTableModule, RouterModule.forChild(routes)],
  declarations: [TableComponent],
  providers: [TableService]
})
export class TableModule {}
