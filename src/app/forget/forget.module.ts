import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { LayoutModule } from '../layout/layout.module';
import { ForgetComponent } from './forget.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent
  }
];

@NgModule({
  imports: [ShareModule, LayoutModule, RouterModule.forChild(routes), NzStepsModule],
  declarations: [ForgetComponent]
})
export class ForgetModule {}
