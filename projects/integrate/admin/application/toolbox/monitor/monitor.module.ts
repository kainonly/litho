import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { HealthComponent } from './chart/health.component';
import { LoadComponent } from './chart/load.component';
import { ResourceComponent } from './chart/resource.component';
import { MonitorComponent } from './monitor.component';

@NgModule({
  imports: [ShareModule],
  declarations: [MonitorComponent, HealthComponent, LoadComponent, ResourceComponent]
})
export class MonitorModule {}
