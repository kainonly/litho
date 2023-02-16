import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LogsystemComponent } from './logsystem.component';

const routes: Routes = [
  {
    path: '',
    component: LogsystemComponent,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        data: {
          breadcrumb: '搜索'
        }
      },
      {
        path: 'collector',
        loadChildren: () => import('./collector/collector.module').then(m => m.CollectorModule),
        data: {
          breadcrumb: '采集器'
        }
      },
      { path: '', redirectTo: 'search', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LogsystemComponent]
})
export class LogsystemModule {}
