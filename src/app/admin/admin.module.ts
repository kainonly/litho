import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccTasksComponent } from './acc-tasks/acc-tasks.component';
import { AdminComponent } from './admin.component';
import { ClustersComponent } from './clusters/clusters.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { ImessagesComponent } from './imessages/imessages.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          breadcrumb: `Projects`
        }
      },
      {
        path: 'clusters',
        component: ClustersComponent,
        data: {
          breadcrumb: `Clusters`
        }
      },
      {
        path: 'endpoints',
        component: EndpointsComponent,
        data: {
          breadcrumb: `Endpoints`
        }
      },
      {
        path: 'imessages',
        component: ImessagesComponent,
        data: {
          breadcrumb: `IMessages`
        }
      },
      {
        path: 'acc-tasks',
        component: AccTasksComponent,
        data: {
          breadcrumb: `AccTasks`
        }
      },
      {
        path: 'datasets',
        component: DatasetsComponent,
        data: {
          breadcrumb: `Dataset`
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule)
      },
      {
        path: 'users',
        component: UsersComponent,
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
  imports: [RouterModule.forChild(routes)]
})
export class AdminModule {}
