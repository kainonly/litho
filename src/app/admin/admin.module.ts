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
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: `Projects`
        }
      },
      {
        path: 'clusters',
        loadChildren: () => import('./clusters/clusters.module').then(m => m.ClustersModule),
        data: {
          breadcrumb: `Clusters`
        }
      },
      {
        path: 'endpoints',
        loadChildren: () => import('./endpoints/entpoints.module').then(m => m.EntpointsModule),
        data: {
          breadcrumb: `Endpoints`
        }
      },
      {
        path: 'imessages',
        loadChildren: () => import('./imessages/imessages.module').then(m => m.ImessagesModule),
        data: {
          breadcrumb: `IMessages`
        }
      },
      {
        path: 'acc-tasks',
        loadChildren: () => import('./acc-tasks/acc-tasks.module').then(m => m.AccTasksModule),
        data: {
          breadcrumb: `AccTasks`
        }
      },
      {
        path: 'datasets',
        loadChildren: () => import('./datasets/datasets.module').then(m => m.DatasetsModule),
        data: {
          breadcrumb: `Dataset`
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        data: {
          breadcrumb: `Monitor`
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: `Users`
        }
      },
      {
        path: 'integrated',
        loadChildren: () => import('./integrated/integrated.module').then(m => m.IntegratedModule),
        data: {
          breadcrumb: `Integrated`
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: `Setting`
        }
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
