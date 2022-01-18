import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { FormComponent } from './form/form.component';
import { LabelComponent } from './form/label/label.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzTransferModule, NzTreeModule],
  declarations: [UsersComponent, FormComponent, LabelComponent],
  providers: [UsersService]
})
export class UsersModule {}
