import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { CollectorComponent } from './collector/collector.component';
import { CollectorModule } from './collector/collector.module';
import { SchedulesComponent } from './schedules/schedules.component';
import { SchedulesModule } from './schedules/schedules.module';
import { ToolboxComponent } from './toolbox.component';
import { ValuesComponent } from './values/values.component';
import { ValuesModule } from './values/values.module';

export const toolbox: Routes = [
  {
    path: 'values',
    component: ValuesComponent,
    data: {
      breadcrumb: '动态配置'
    }
  },
  {
    path: 'schedules',
    component: SchedulesComponent,
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
  { path: '', redirectTo: '/admin/application/toolbox/values', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, ValuesModule, SchedulesModule, CollectorModule],
  declarations: [ToolboxComponent]
})
export class ToolboxModule {}
