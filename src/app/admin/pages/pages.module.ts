import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages.component';
import { PagesSerivce } from './pages.serivce';

const routes: Routes = [
  {
    path: ':key',
    component: PagesComponent,
    data: {
      breadcrumb: 'NO'
    },
    children: [
      {
        path: 'schema',
        loadChildren: () => import('./tab-schema/schema.module').then(m => m.SchemaModule),
        data: {
          breadcrumb: '数据源'
        }
      },
      {
        path: 'indexes',
        loadChildren: () => import('./tab-indexes/indexes.module').then(m => m.IndexesModule),
        data: {
          breadcrumb: '索引规则'
        }
      },
      {
        path: 'rules',
        loadChildren: () => import('./tab-rules/rules.module').then(m => m.RulesModule),
        data: {
          breadcrumb: '显隐规则'
        }
      },
      {
        path: 'validator',
        loadChildren: () => import('./tab-validator/validator.module').then(m => m.ValidatorModule),
        data: {
          breadcrumb: '验证器'
        }
      }
    ]
  },
  { path: '', redirectTo: '/admin/settings/pages/home', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, NzTreeModule, NzTreeSelectModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, FormComponent],
  providers: [PagesSerivce]
})
export class PagesModule {}
