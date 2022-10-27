import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: 'values',
    loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
    data: {
      breadcrumb: '动态配置'
    }
  },
  {
    path: 'schedules',
    loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule),
    data: {
      breadcrumb: '定时调度'
    }
  },
  {
    path: 'collector',
    loadChildren: () => import('./collector/collector.module').then(m => m.CollectorModule),
    data: {
      breadcrumb: '日志采集'
    }
  },
  { path: '', redirectTo: 'values', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class DeveloperModule {}
