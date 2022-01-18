import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { FormComponent } from './form/form.component';
import { LabelComponent } from './form/label/label.component';
import { PermissionComponent } from './permission/permission.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTransferModule, NzTreeModule],
  declarations: [RolesComponent, FormComponent, LabelComponent, PermissionComponent],
  providers: [RolesService]
})
export class RolesModule {}
