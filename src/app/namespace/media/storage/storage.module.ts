import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CosComponent } from './cos/cos.component';
import { PlatformComponent } from './platform/platform.component';
import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [StorageComponent, PlatformComponent, CosComponent]
})
export class StorageModule {}
