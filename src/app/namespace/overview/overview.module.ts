import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: 'cluster',
        loadChildren: () => import('./cluster/cluster.module').then(m => m.ClusterModule),
        data: {
          breadcrumb: '集群'
        }
      },
      {
        path: 'cloud',
        loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule),
        data: {
          breadcrumb: '公有云'
        }
      },
      {
        path: 'office',
        loadChildren: () => import('./office/office.module').then(m => m.OfficeModule),
        data: {
          breadcrumb: '企业平台'
        }
      },
      {
        path: 'functions',
        loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule),
        data: {
          breadcrumb: '功能模块'
        }
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
        data: {
          breadcrumb: '安全策略'
        }
      },
      { path: '', redirectTo: 'cluster', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
