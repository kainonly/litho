import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AuditComponent } from './audit/audit.component';
import { ThirdPartyComponent } from './third-party/third-party.component';

export const other: Routes = [
  {
    path: 'audit',
    component: AuditComponent,
    data: {
      breadcrumb: '审计日志'
    }
  },
  {
    path: 'third-party',
    component: ThirdPartyComponent,
    data: {
      breadcrumb: '第三方绑定'
    }
  },
  { path: '', redirectTo: '/center/other/audit', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [AuditComponent, ThirdPartyComponent],
  exports: [AuditComponent, ThirdPartyComponent]
})
export class OtherModule {}
