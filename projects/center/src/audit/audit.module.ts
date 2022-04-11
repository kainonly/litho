import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { HistoryComponent } from './history/history.component';
import { SessionComponent } from './session/session.component';

export const audit: Routes = [
  {
    path: 'session',
    component: SessionComponent,
    data: {
      breadcrumb: '会话记录'
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      breadcrumb: '操作记录'
    }
  },
  { path: '', redirectTo: '/center/audit/session', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [SessionComponent, HistoryComponent]
})
export class AuditModule {}
