import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { BasicComponent } from './basic/basic.component';
import { OpenapiComponent } from './openapi.component';

@NgModule({
  imports: [ShareModule],
  declarations: [OpenapiComponent, BasicComponent],
  exports: [OpenapiComponent]
})
export class OpenapiModule {}
