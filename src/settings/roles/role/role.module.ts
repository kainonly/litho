import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  imports: [ShareModule, NzTreeModule, RouterModule.forChild(routes)],
  declarations: [RoleComponent]
})
export class RoleModule {}
