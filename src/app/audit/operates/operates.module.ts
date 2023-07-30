import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OperatesComponent } from './operates.component';

const routes: Routes = [
  {
    path: '',
    component: OperatesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OperatesComponent]
})
export class OperatesModule {}
