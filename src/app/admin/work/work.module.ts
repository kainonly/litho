import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { WorkComponent } from './work.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
        data: {
          breadcrumb: $localize`常用`
        }
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
        data: {
          breadcrumb: $localize`任务`
        }
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
        data: {
          breadcrumb: $localize`通知`
        }
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent]
})
export class WorkModule {}
