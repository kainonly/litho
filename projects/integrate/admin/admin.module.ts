import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { AdminComponent } from './admin.component';
import { application, ApplicationModule } from './application/application.module';
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
  imports: [WpxShareModule, WpxModule, ApplicationModule, SecurityModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
