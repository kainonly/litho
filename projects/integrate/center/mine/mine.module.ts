import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxRichtextModule } from '@weplanx/ng/richtext';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { CalendarComponent } from './calendar/calendar.component';
import { NotebookComponent } from './notebook/notebook.component';
import { WorkbenchComponent } from './workbench/workbench.component';

export const mine: Routes = [
  {
    path: 'workbench',
    component: WorkbenchComponent,
    data: {
      breadcrumb: '工作台'
    }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: {
      breadcrumb: '日历'
    }
  },
  {
    path: 'notebook',
    component: NotebookComponent,
    data: {
      breadcrumb: '笔记本'
    }
  },
  { path: '', redirectTo: '/center/mine/workbench', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, NzCalendarModule, WpxRichtextModule],
  declarations: [WorkbenchComponent, CalendarComponent, NotebookComponent]
})
export class MineModule {}
