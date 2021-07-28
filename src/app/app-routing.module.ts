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
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          disabled: ['pageHeader']
        }
      },
      {
        path: 'result',
        loadChildren: () => import('./pages/result/result.module').then(m => m.ResultModule)
      },
      {
        path: 'exception',
        loadChildren: () => import('./pages/exception/exception.module').then(m => m.ExceptionModule)
      },
      {
        path: 'center',
        loadChildren: () => import('./pages/center/center.module').then(m => m.CenterModule)
      },
      { path: '', redirectTo: '/dashboard/analysis', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, LayoutModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
