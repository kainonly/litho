import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { WorkComponent } from './work.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent]
})
export class WorkModule {}
