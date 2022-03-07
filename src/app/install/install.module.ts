import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { InstallComponent } from './install.component';

const routes: Routes = [
  {
    path: '',
    component: InstallComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes), NzStepsModule, NzCollapseModule],
  declarations: [InstallComponent]
})
export class InstallModule {}
