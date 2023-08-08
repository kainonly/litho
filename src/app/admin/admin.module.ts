import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: `工作台`
        }
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: `项目`
        }
      },
      {
        path: 'clusters',
        loadChildren: () => import('./clusters/clusters.module').then(m => m.ClustersModule),
        data: {
          breadcrumb: `集群`
        }
      },
      {
        path: 'workflow',
        loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule),
        data: {
          breadcrumb: `工作流`
        }
      },
      {
        path: 'queue',
        loadChildren: () => import('./queue/queue.module').then(m => m.QueueModule),
        data: {
          breadcrumb: `消息队列`
        }
      },
      {
        path: 'im',
        loadChildren: () => import('./im/im.module').then(m => m.ImModule),
        data: {
          breadcrumb: `即时通信`
        }
      },
      {
        path: 'logset',
        loadChildren: () => import('./logset/logset.module').then(m => m.LogsetModule),
        data: {
          breadcrumb: `日志采集`
        }
      },
      {
        path: 'observability',
        loadChildren: () => import('./observability/observability.module').then(m => m.ObservabilityModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: `团队成员`
        }
      },
      {
        path: 'integrated',
        loadChildren: () => import('./integrated/integrated.module').then(m => m.IntegratedModule),
        data: {
          breadcrumb: `集成服务`
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: `设置`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
