import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent]
})
export class MonitorModule {}
