import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TaskComponent]
})
export class TaskModule {}
