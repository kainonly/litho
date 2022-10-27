import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OpenapiComponent } from '../openapi/openapi.component';
import { OfficeComponent } from './office.component';
import { PlatformComponent } from './platform/platform.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: OpenapiComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OfficeComponent, PlatformComponent, RedirectComponent]
})
export class OfficeModule {}
