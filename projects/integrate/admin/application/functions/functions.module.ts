import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { CloudComponent } from './cloud/cloud.component';
import { CloudModule } from './cloud/cloud.module';
import { CollectorComponent } from './collector/collector.component';
import { CollectorModule } from './collector/collector.module';
import { FunctionsComponent } from './functions.component';
import { OfficeComponent } from './office/office.component';
import { OfficeModule } from './office/office.module';
import { PublicComponent } from './public/public.component';
import { PublicModule } from './public/public.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleModule } from './schedule/schedule.module';

export const functions: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    data: {
      breadcrumb: '公共配置'
    }
  },
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
    path: 'schedule',
    component: ScheduleComponent,
    data: {
      breadcrumb: '定时调度'
    }
  },
  {
    path: 'collector',
    component: CollectorComponent,
    data: {
      breadcrumb: '日志采集'
    }
  },
  { path: '', redirectTo: '/admin/application/functions/public', pathMatch: 'full' }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    NzDescriptionsModule,
    CloudModule,
    OfficeModule,
    PublicModule,
    ScheduleModule,
    CollectorModule
  ],
  declarations: [FunctionsComponent]
})
export class FunctionsModule {}
