import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankModule } from '@common/blank/blank.module';
import { ShareModule } from '@common/share.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ForgetComponent } from './forget.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent
  }
];

@NgModule({
  imports: [ShareModule, BlankModule, RouterModule.forChild(routes), NzStepsModule],
  declarations: [ForgetComponent]
})
export class ForgetModule {}
