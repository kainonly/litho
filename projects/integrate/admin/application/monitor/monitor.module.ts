import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { HealthComponent } from './chart/health.component';
import { LoadComponent } from './chart/load.component';
import { ResourceComponent } from './chart/resource.component';
import { MonitorComponent } from './monitor.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [MonitorComponent, HealthComponent, LoadComponent, ResourceComponent]
})
export class MonitorModule {}
