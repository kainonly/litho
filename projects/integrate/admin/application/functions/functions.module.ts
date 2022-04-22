import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';

import { CloudComponent } from './cloud/cloud.component';
import { ExtendComponent } from './extend/extend.component';
import { FunctionsComponent } from './functions.component';
import { OfficeComponent } from './office/office.component';

export const functions: Routes = [
  {
    path: 'cloud',
    component: CloudComponent,
    data: {
      breadcrumb: '云厂商'
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
    path: 'extend',
    component: ExtendComponent,
    data: {
      breadcrumb: '扩展服务'
    }
  },
  { path: '', redirectTo: '/admin/application/functions/cloud', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzImageModule],
  declarations: [FunctionsComponent, CloudComponent, OfficeComponent, ExtendComponent]
})
export class FunctionsModule {}
