import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: '会话'
        }
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: {
          breadcrumb: '审计'
        }
      },
      {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule),
        data: {
          breadcrumb: '告警'
        }
      },
      { path: '', redirectTo: 'sessions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent]
})
export class MonitorModule {}
