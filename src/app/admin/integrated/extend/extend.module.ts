import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EmailComponent } from './email/email.component';
import { ExtendComponent } from './extend.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { SmsComponent } from './sms/sms.component';

const routes: Routes = [
  {
    path: '',
    component: ExtendComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ExtendComponent, EmailComponent, SmsComponent, OpenapiComponent]
})
export class ExtendModule {}
