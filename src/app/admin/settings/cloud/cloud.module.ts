import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CloudComponent } from './cloud.component';
import { CosComponent } from './cos/cos.component';
import { TencentComponent } from './tencent/tencent.component';

const routes: Routes = [
  {
    path: '',
    component: CloudComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CloudComponent, TencentComponent, CosComponent]
})
export class CloudModule {}
