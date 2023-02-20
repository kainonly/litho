import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'work',
        loadChildren: () => import('./work/work.module').then(m => m.WorkModule),
        data: {
          breadcrumb: $localize`工作区`
        }
      },
      {
        path: 'space',
        loadChildren: () => import('./space/space.module').then(m => m.SpaceModule),
        data: {
          breadcrumb: $localize`空间`
        }
      },
      {
        path: 'orgs',
        loadChildren: () => import('./orgs/orgs.module').then(m => m.OrgsModule),
        data: {
          breadcrumb: $localize`组织`
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        data: {
          breadcrumb: $localize`监控`
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: $localize`设置`
        }
      },
      { path: '', redirectTo: 'work', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
