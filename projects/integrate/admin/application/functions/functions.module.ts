import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { CloudComponent } from './cloud/cloud.component';
import { CloudModule } from './cloud/cloud.module';
import { EmailComponent } from './email/email.component';
import { EmailModule } from './email/email.module';
import { FunctionsComponent } from './functions.component';
import { OfficeComponent } from './office/office.component';
import { OfficeModule } from './office/office.module';
import { OpenapiComponent } from './openapi/openapi.component';
import { OpenapiModule } from './openapi/openapi.module';

export const functions: Routes = [
  {
    path: 'cloud',
    component: CloudComponent,
    data: {
      breadcrumb: '云平台'
    }
  },
  {
    path: 'office',
    component: OfficeComponent,
    data: {
      breadcrumb: '企业办公'
    }
  },
  {
    path: 'email',
    component: EmailComponent,
    data: {
      breadcrumb: '电子邮件'
    }
  },
  {
    path: 'openapi',
    component: OpenapiComponent,
    data: {
      breadcrumb: '开放服务'
    }
  },
  { path: '', redirectTo: '/admin/application/functions/cloud', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, CloudModule, OfficeModule, EmailModule, OpenapiModule],
  declarations: [FunctionsComponent]
})
export class FunctionsModule {}
