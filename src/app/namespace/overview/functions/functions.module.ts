import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EmailComponent } from './email/email.component';
import { FunctionsComponent } from './functions.component';
import { OpenapiComponent } from './openapi/openapi.component';

const routes: Routes = [
  {
    path: '',
    component: FunctionsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [FunctionsComponent, EmailComponent, OpenapiComponent]
})
export class FunctionsModule {}
