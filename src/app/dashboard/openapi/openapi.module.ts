import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BasicComponent } from './basic/basic.component';
import { OpenapiComponent } from './openapi.component';

const routes: Routes = [
  {
    path: '',
    component: OpenapiComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OpenapiComponent, BasicComponent]
})
export class OpenapiModule {}
