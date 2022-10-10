import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CloudComponent } from './cloud.component';
import { CosComponent } from './cos/cos.component';
import { PlatformComponent } from './platform/platform.component';

const routes: Routes = [
  {
    path: '',
    component: CloudComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CloudComponent, PlatformComponent, CosComponent]
})
export class CloudModule {}
