import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { DepartmentsComponent } from './departments.component';
import { DepartmentsService } from './departments.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTransferModule, NzTreeModule],
  declarations: [DepartmentsComponent],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
