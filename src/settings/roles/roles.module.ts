import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesSerivce } from '@settings/pages/pages.serivce';
import { FormComponent } from '@settings/roles/form/form.component';
import { AppShareModule } from '@share';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

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
  imports: [AppShareModule, NzTreeModule, NzTreeSelectModule, RouterModule.forChild(routes)],
  declarations: [RolesComponent, FormComponent],
  providers: [RolesService, PagesSerivce]
})
export class RolesModule {}
