import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageModule } from '@common/components/page/page.module';
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
  imports: [ShareModule, PageModule, NzStepsModule, RouterModule.forChild(routes)],
  declarations: [ForgetComponent]
})
export class ForgetModule {}
