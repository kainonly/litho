import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankLayoutModule } from '@common/blank-layout/blank-layout.module';
import { ShareModule } from '@common/share.module';
import { TranslationModule } from '@common/translation/translation.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ForgetComponent } from './forget.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent
  }
];

@NgModule({
  imports: [ShareModule, TranslationModule, RouterModule.forChild(routes), NzStepsModule, BlankLayoutModule],
  declarations: [ForgetComponent]
})
export class ForgetModule {}
