import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxActivated } from '@weplanx/common/layout';
import { WpxTemplateComponent, WpxTemplateModule } from '@weplanx/components/template';

import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [WpxActivated],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: ':pageId',
        component: WpxTemplateComponent
      },
      { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, LayoutModule, WpxTemplateModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
