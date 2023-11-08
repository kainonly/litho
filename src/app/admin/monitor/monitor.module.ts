import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaComponent } from './area.component';
import { LineComponent } from './line.component';
import { MonitorComponent } from './monitor.component';
import { MonitorService } from './monitor.service';
import { SumComponent } from './sum.component';

const routes: Routes = [
  {
    path: ':type',
    component: MonitorComponent,
    data: {
      breadcrumb: `Monitor`
    }
  },
  { path: '', redirectTo: 'mongo', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent, AreaComponent, LineComponent, SumComponent],
  providers: [MonitorService]
})
export class MonitorModule {}
