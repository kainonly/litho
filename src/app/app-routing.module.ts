import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
      // {
      //   path: ':fragments',
      //   component: WpxTemplateComponent
      // }
      // { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      // { path: '**', loadChildren: () => import('./empty/empty.module').then(m => m.EmptyModule) }
    ]
  }
];

@NgModule({
  imports: [ShareModule, LayoutModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
