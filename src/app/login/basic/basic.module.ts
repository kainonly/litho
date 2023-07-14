import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BasicComponent } from './basic.component';

const routes: Routes = [
  {
    path: '',
    component: BasicComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [BasicComponent]
})
export class BasicModule {}
