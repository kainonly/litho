import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { application, ApplicationModule } from './application/application.module';
import { security, SecurityModule } from './security/security.module';
import { SettingsComponent } from './settings.component';
import { third_party, ThirdPartyModule } from './third-party/third-party.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'application',
        children: application,
        data: {
          breadcrumb: '应用设置'
        }
      },
      {
        path: 'security',
        children: security,
        data: {
          breadcrumb: '安全性'
        }
      },
      {
        path: 'third-party',
        children: third_party
      },
      { path: '', redirectTo: '/settings/application/pages/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxShareModule,
    WpxModule,
    ApplicationModule,
    SecurityModule,
    ThirdPartyModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
