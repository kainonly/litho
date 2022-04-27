import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { StageModule } from '@common/stage/stage.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ForgetComponent } from './forget.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent
  }
];

@NgModule({
  imports: [ShareModule, StageModule, RouterModule.forChild(routes), NzStepsModule],
  declarations: [ForgetComponent]
})
export class ForgetModule {}
