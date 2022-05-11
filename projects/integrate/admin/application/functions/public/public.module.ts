import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { PublicComponent } from './public.component';

@NgModule({
  imports: [ShareModule],
  declarations: [PublicComponent, EmailComponent, OpenapiComponent],
  exports: [PublicComponent]
})
export class PublicModule {}
