import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MonitorComponent } from './monitor.component';
import { MonitorService } from './monitor.service';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: 'apm',
        loadChildren: () => import('./apm/apm.module').then(m => m.ApmModule),
        data: {
          breadcrumb: $localize`应用`
        }
      },
      {
        path: 'db',
        loadChildren: () => import('./db/db.module').then(m => m.DbModule),
        data: {
          breadcrumb: $localize`数据库`
        }
      },
      {
        path: 'cache',
        loadChildren: () => import('./cache/cache.module').then(m => m.CacheModule),
        data: {
          breadcrumb: $localize`缓存`
        }
      },
      {
        path: 'queue',
        loadChildren: () => import('./queue/queue.module').then(m => m.QueueModule),
        data: {
          breadcrumb: $localize`队列`
        }
      },
      // {
      //   path: 'extend',
      //   loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
      //   data: {
      //     breadcrumb: $localize`扩展`
      //   }
      // },
      { path: '', redirectTo: 'apm', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent],
  providers: [MonitorService]
})
export class MonitorModule {}
