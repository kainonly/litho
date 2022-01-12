import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';

import { FormComponent } from './form/form.component';
import { LabelComponent } from './form/label/label.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTransferModule],
  declarations: [RolesComponent, FormComponent, LabelComponent],
  providers: [RolesService]
})
export class RolesModule {}
