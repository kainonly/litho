import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: 'apm',
        loadChildren: () => import('./apm/apm.module').then(m => m.ApmModule),
        data: {
          breadcrumb: `APM`
        }
      },
      {
        path: 'mongodb',
        loadChildren: () => import('./mongodb/mongodb.module').then(m => m.MongodbModule),
        data: {
          breadcrumb: `MongoDB`
        }
      },
      {
        path: 'redis',
        loadChildren: () => import('./redis/redis.module').then(m => m.RedisModule),
        data: {
          breadcrumb: `Redis`
        }
      },
      {
        path: 'nats',
        loadChildren: () => import('./nats/nats.module').then(m => m.NatsModule),
        data: {
          breadcrumb: `Nats`
        }
      },
      {
        path: 'extend',
        loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
        data: {
          breadcrumb: $localize`扩展服务`
        }
      },
      { path: '', redirectTo: 'apm', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent]
})
export class MonitorModule {}
