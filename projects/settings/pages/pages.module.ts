import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages.component';
import { PagesSerivce } from './pages.serivce';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          breadcrumb: '使用提示'
        }
      },
      {
        path: ':key/schema',
        loadChildren: () => import('./tab-schema/schema.module').then(m => m.SchemaModule),
        data: {
          breadcrumb: '数据源'
        }
      },
      {
        path: ':key/indexes',
        loadChildren: () => import('./tab-indexes/indexes.module').then(m => m.IndexesModule),
        data: {
          breadcrumb: '索引规则'
        }
      },
      {
        path: ':key/rules',
        loadChildren: () => import('./tab-rules/rules.module').then(m => m.RulesModule),
        data: {
          breadcrumb: '显隐规则'
        }
      },
      {
        path: ':key/validator',
        loadChildren: () => import('./tab-validator/validator.module').then(m => m.ValidatorModule),
        data: {
          breadcrumb: '验证器'
        }
      },
      { path: '', redirectTo: '/settings/pages/home', pathMatch: 'full' }
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
  declarations: [PagesComponent, FormComponent]
})
export class PagesModule {}
