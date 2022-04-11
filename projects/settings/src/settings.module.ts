import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxHeaderModule } from '@weplanx/components/header';
import { WpxNavModule } from '@weplanx/components/nav';

import { application, ApplicationModule } from './application/application.module';
import { organize, OrganizeModule } from './organize/organize.module';
import { security, SecurityModule } from './security/security.module';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'application',
        children: application,
        data: {
          breadcrumb: '应用'
        }
      },
      {
        path: 'organize',
        children: organize,
        data: {
          breadcrumb: '组织'
        }
      },
      {
        path: 'security',
        children: security,
        data: {
          breadcrumb: '安全性'
        }
      },
      { path: '', redirectTo: '/settings/application/overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxShareModule,
    WpxModule,
    WpxHeaderModule,
    WpxNavModule,
    ApplicationModule,
    OrganizeModule,
    SecurityModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
