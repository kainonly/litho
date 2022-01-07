import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { RoleComponent } from './role.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzTreeModule],
  declarations: [RoleComponent]
})
export class RoleModule {}
