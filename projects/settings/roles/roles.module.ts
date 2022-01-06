import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          breadcrumb: '使用提示'
        }
      },
      {
        path: ':key',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
        data: {
          breadcrumb: '权限设置'
        }
      },
      { path: '', redirectTo: '/settings/roles/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxModule,
    WpxLayoutModule,
    WpxShareModule,
    NzTreeModule,
    NzTreeSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RolesComponent, FormComponent]
})
export class RolesModule {}
