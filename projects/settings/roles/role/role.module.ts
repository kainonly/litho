import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { RoleComponent } from './role.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, NzTreeModule],
  declarations: [RoleComponent]
})
export class RoleModule {}
