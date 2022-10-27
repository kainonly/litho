import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: 'cloud',
    loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule),
    data: {
      breadcrumb: '云平台'
    }
  },
  {
    path: 'office',
    loadChildren: () => import('./office/office.module').then(m => m.OfficeModule),
    data: {
      breadcrumb: '企业办公'
    }
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then(m => m.EmailModule),
    data: {
      breadcrumb: '电子邮件'
    }
  },
  {
    path: 'openapi',
    loadChildren: () => import('./openapi/openapi.module').then(m => m.OpenapiModule),
    data: {
      breadcrumb: '开放服务'
    }
  },
  { path: '', redirectTo: 'cloud', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
