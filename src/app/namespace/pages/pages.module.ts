import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';

import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PagesService } from './pages.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: '提示'
        }
      },
      {
        path: ':id/schema',
        loadChildren: () => import('./schema/schema.module').then(m => m.SchemaModule),
        data: {
          breadcrumb: '内容模型'
        }
      },
      {
        path: ':id/indexes',
        loadChildren: () => import('./indexes/indexes.module').then(m => m.IndexesModule),
        data: {
          breadcrumb: '索引规则'
        }
      },
      {
        path: ':id/rules',
        loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule),
        data: {
          breadcrumb: '显隐规则'
        }
      },
      {
        path: ':id/advanced',
        loadChildren: () => import('./advanced/advanced.module').then(m => m.AdvancedModule),
        data: {
          breadcrumb: '高级设置'
        }
      },
      {
        path: ':id/manual',
        loadChildren: () => import('./manual/manual.module').then(m => m.ManualModule),
        data: {
          breadcrumb: '自定义设置'
        }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes), NzHighlightModule],
  declarations: [PagesComponent, HomeComponent, FormComponent],
  providers: [PagesService]
})
export class PagesModule {}
