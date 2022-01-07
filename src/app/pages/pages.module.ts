import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxActivated } from '@weplanx/common';
import { WpxDynamicComponent, WpxDynamicModule } from '@weplanx/components';

import { EmptyComponent } from './empty/empty.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [WpxActivated],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: ':pageId',
        component: WpxDynamicComponent
      },
      { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, WpxDynamicModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, EmptyComponent]
})
export class PagesModule {}
