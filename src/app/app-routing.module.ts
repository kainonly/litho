import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
        data: {
          disabled: ['pageHeader']
        }
      },
      {
        path: 'center',
        loadChildren: () => import('./pages/center/center.module').then(m => m.CenterModule)
      },
      {
        path: 'empty',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, LayoutModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
