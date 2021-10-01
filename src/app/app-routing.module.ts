import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { WpxPagesComponent } from '@weplanx/ngx/layout';

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
      },
      {
        path: 'center',
        loadChildren: () => import('./center/center.module').then(m => m.CenterModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: ':pages',
        component: WpxPagesComponent
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: '**', loadChildren: () => import('./empty/empty.module').then(m => m.EmptyModule) }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, LayoutModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
