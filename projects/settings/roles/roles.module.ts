import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
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
  imports: [
    WpxModule,
    WpxLayoutModule,
    WpxShareModule,
    RouterModule,
    NzTreeModule,
    NzTreeSelectModule,
    HomeModule,
    RoleModule
  ],
  declarations: [RolesComponent, FormComponent],
  providers: [RolesService]
})
export class RolesModule {}
