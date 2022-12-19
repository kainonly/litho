import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

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
          breadcrumb: '集群概况'
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
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
