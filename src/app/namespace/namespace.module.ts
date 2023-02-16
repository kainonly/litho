import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { NamespaceComponent } from './namespace.component';

const routes: Routes = [
  {
    path: '',
    component: NamespaceComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        data: {
          breadcrumb: '内容生成器'
        }
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
        data: {
          breadcrumb: '媒体'
        }
      },
      {
        path: 'orgs',
        loadChildren: () => import('./orgs/orgs.module').then(m => m.OrgsModule),
        data: {
          breadcrumb: '组织'
        }
      },
      {
        path: 'schedules',
        loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule),
        data: {
          breadcrumb: '任务调度'
        }
      },
      {
        path: 'logsystem',
        loadChildren: () => import('./logsystem/logsystem.module').then(m => m.LogsystemModule),
        data: {
          breadcrumb: '日志系统'
        }
      },
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: '总览'
        }
      }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [NamespaceComponent]
})
export class NamespaceModule {}
