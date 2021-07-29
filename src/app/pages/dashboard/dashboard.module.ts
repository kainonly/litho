import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AnalysisComponent } from './analysis/analysis.component';
import { CharacterComponent } from './analysis/chart/character.component';
import { ConversionComponent } from './analysis/chart/conversion.component';
import { EffectComponent } from './analysis/chart/effect.component';
import { KeywordComponent } from './analysis/chart/keyword.component';
import { SalesPerComponent } from './analysis/chart/sales-per.component';
import { SalesTrendComponent } from './analysis/chart/sales-trend.component';
import { SalesTypeComponent } from './analysis/chart/sales-type.component';
import { TargetComponent } from './analysis/chart/target.component';
import { TimelineComponent } from './analysis/chart/timeline.component';
import { HealthComponent } from './monitor/chart/health.component';
import { LoadComponent } from './monitor/chart/load.component';
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
  },
  { path: '', redirectTo: '/dashboard/analysis', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [
    AnalysisComponent,
    MonitorComponent,
    WorkbenchComponent,
    TargetComponent,
    TimelineComponent,
    EffectComponent,
    ConversionComponent,
    SalesTrendComponent,
    CharacterComponent,
    KeywordComponent,
    SalesPerComponent,
    SalesTypeComponent,
    HealthComponent,
    LoadComponent
  ]
})
export class DashboardModule {}
