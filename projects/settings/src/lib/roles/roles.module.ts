import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { RoleComponent } from './role/role.component';
import { RoleModule } from './role/role.module';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

export const roles: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: '使用提示'
    }
  },
  {
    path: ':key',
    component: RoleComponent,
    data: {
      breadcrumb: '权限设置'
    }
  },
  { path: '', redirectTo: '/settings/roles/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, NzTreeModule, NzTreeSelectModule, NzResultModule, RoleModule],
  declarations: [RolesComponent, HomeComponent, FormComponent],
  providers: [RolesService]
})
export class RolesModule {}
