import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { NamespaceComponent } from './namespace.component';

const routes: Routes = [
  {
    path: '',
    component: NamespaceComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: '总览'
        }
      },
      {
        path: 'factory',
        loadChildren: () => import('./factory/factory.module').then(m => m.FactoryModule),
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
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
        data: {
          breadcrumb: '安全性'
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        data: {
          breadcrumb: '监控'
        }
      },
      {
        path: 'developer',
        loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule),
        data: {
          breadcrumb: '开发者'
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [NamespaceComponent]
})
export class NamespaceModule {}
