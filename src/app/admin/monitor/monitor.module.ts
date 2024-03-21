import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonitorComponent } from './monitor.component';
import { MonitorService } from './monitor.service';

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
  imports: [RouterModule.forChild(routes)],
  providers: [MonitorService]
})
export class MonitorModule {}
