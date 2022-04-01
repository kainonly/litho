import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { application, ApplicationModule } from './application/application.module';
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
        path: 'security',
        children: security,
        data: {
          breadcrumb: '安全性'
        }
      },
      { path: '', redirectTo: '/settings/application/roles', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, ApplicationModule, SecurityModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
