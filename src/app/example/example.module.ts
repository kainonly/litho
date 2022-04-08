import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxDynamicModule } from '@weplanx/components';
import { WpxHeaderModule } from '@weplanx/components/header';
import { WpxNavModule } from '@weplanx/components/nav';

import { EmptyComponent } from './empty/empty.component';
import { ExampleComponent } from './example.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          breadcrumb: '主页'
        }
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        data: {
          breadcrumb: '静态表单'
        }
      },
      {
        path: 'dynamic-form',
        loadChildren: () => import('./dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule),
        data: {
          breadcrumb: '动态表单'
        }
      },
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
        data: {
          breadcrumb: '动态表格'
        }
      },
      { path: '', redirectTo: '/example/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, WpxDynamicModule, WpxHeaderModule, WpxNavModule, RouterModule.forChild(routes)],
  declarations: [ExampleComponent, EmptyComponent]
})
export class ExampleModule {}
