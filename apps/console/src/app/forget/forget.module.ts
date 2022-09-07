import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@console/common/layout/layout.module';
import { ShareModule } from '@console/common/share.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

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
