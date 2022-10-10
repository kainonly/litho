import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { CpuComponent } from './chart/cpu.component';
import { LoadComponent } from './chart/load.component';
import { MemComponent } from './chart/mem.component';
import { SessionComponent } from './chart/session.component';
import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent, SessionComponent, LoadComponent, CpuComponent, MemComponent]
})
export class MonitorModule {}
