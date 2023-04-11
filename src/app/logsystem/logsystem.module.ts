import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LogsystemComponent } from './logsystem.component';

const routes: Routes = [
  {
    path: '',
    component: LogsystemComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LogsystemComponent]
})
export class LogsystemModule {}
