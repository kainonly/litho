import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WpxHeaderModule } from '../header/header.module';
import { WpxNavModule } from '../nav/nav.module';
import { AdminComponent } from './admin.component';
import { application, ApplicationModule } from './application/application.module';
import { organize, OrganizeModule } from './organize/organize.module';
import { security, SecurityModule } from './security/security.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
      { path: '', redirectTo: '/admin/application/factory/home', pathMatch: 'full' }
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
  declarations: [AdminComponent]
})
export class AdminModule {}
