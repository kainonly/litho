import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ApmComponent } from './apm.component';
import { DelayComponent } from './delay/delay.component';

const routes: Routes = [
  {
    path: '',
    component: ApmComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ApmComponent, DelayComponent]
})
export class ApmModule {}
