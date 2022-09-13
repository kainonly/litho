import { NgModule } from '@angular/core';

import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { ShareModule } from '../share.module';
import { CpuComponent } from './chart/cpu.component';
import { LoadComponent } from './chart/load.component';
import { MemComponent } from './chart/mem.component';
import { SessionComponent } from './chart/session.component';
import { MonitorComponent } from './monitor.component';

@NgModule({
  imports: [ShareModule, NzStatisticModule],
  declarations: [MonitorComponent, SessionComponent, LoadComponent, CpuComponent, MemComponent]
})
export class MonitorModule {}
