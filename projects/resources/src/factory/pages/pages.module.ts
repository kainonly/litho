import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { IndexesComponent } from './tab-indexes/indexes.component';
import { IndexesModule } from './tab-indexes/indexes.module';
import { SchemaComponent } from './tab-schema/schema.component';
import { SchemaModule } from './tab-schema/schema.module';
import { ValidatorComponent } from './tab-validator/validator.component';
import { ValidatorModule } from './tab-validator/validator.module';

export const pages: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: '提示'
    }
  },
  {
    path: ':key/schema',
    component: SchemaComponent,
    data: {
      breadcrumb: '内容模型'
    }
  },
  {
    path: ':key/indexes',
    component: IndexesComponent,
    data: {
      breadcrumb: '索引规则'
    }
  },
  {
    path: ':key/validator',
    component: ValidatorComponent,
    data: {
      breadcrumb: '验证器'
    }
  },
  { path: '', redirectTo: '/resources/factory/pages/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    NzTreeModule,
    NzTreeSelectModule,
    NzResultModule,
    IndexesModule,
    SchemaModule,
    ValidatorModule,
    NzSliderModule
  ],
  declarations: [PagesComponent, HomeComponent, FormComponent]
})
export class PagesModule {}
