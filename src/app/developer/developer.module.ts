import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { DeveloperComponent } from './developer.component';

const routes: Routes = [
  {
    path: '',
    component: DeveloperComponent,
    children: [
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
      { path: '', redirectTo: '/developer/values', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [DeveloperComponent]
})
export class DeveloperModule {}
