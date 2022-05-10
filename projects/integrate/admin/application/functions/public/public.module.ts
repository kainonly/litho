import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { CdnComponent } from './cdn/cdn.component';
import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { PublicComponent } from './public.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [PublicComponent, CdnComponent, EmailComponent, OpenapiComponent],
  exports: [PublicComponent]
})
export class PublicModule {}
