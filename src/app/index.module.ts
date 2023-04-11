import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DesignService } from './design/design.service';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'design',
        loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
        data: {
          breadcrumb: '设计器'
        }
      },
      {
        path: 'datasource',
        loadChildren: () => import('./datasource/datasource.module').then(m => m.DatasourceModule),
        data: {
          breadcrumb: '数据源'
        }
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
        data: {
          breadcrumb: '资源'
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
          breadcrumb: '调度'
        }
      },
      {
        path: 'logsystem',
        loadChildren: () => import('./logsystem/logsystem.module').then(m => m.LogsystemModule),
        data: {
          breadcrumb: '日志'
        }
      },
      { path: '', redirectTo: 'design', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [IndexComponent],
  providers: [DesignService]
})
export class IndexModule {}
