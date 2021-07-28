import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { WorkbenchComponent } from './workbench/workbench.component';

const routes: Routes = [
  {
    path: 'analysis',
    component: AnalysisComponent
  },
  {
    path: 'monitor',
    component: MonitorComponent
  },
  {
    path: 'workbench',
    component: WorkbenchComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [AnalysisComponent, MonitorComponent, WorkbenchComponent]
})
export class DashboardModule {}
