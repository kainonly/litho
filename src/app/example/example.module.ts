import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxHeaderModule, WpxNavModule } from '@weplanx/ng-intgr';
import { WpxFormModule } from '@weplanx/ng/form';
import { WpxTableModule } from '@weplanx/ng/table';

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
        path: 'pages-form',
        loadChildren: () => import('./pages-form/pages-form.module').then(m => m.PagesFormModule),
        data: {
          breadcrumb: '动态表单'
        }
      },
      {
        path: 'pages-table',
        loadChildren: () => import('./pages-table/pages-table.module').then(m => m.PagesTableModule),
        data: {
          breadcrumb: '动态表格'
        }
      },

      { path: '', redirectTo: '/example/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, WpxTableModule, WpxFormModule, WpxHeaderModule, WpxNavModule, RouterModule.forChild(routes)],
  declarations: [ExampleComponent, EmptyComponent]
})
export class ExampleModule {}
