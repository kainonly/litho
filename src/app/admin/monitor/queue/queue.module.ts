import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { QueueComponent } from './queue.component';

const routes: Routes = [
  {
    path: '',
    component: QueueComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [QueueComponent]
})
export class QueueModule {}
