import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';

import { WpxDynamicComponent } from './dynamic.component';
import { DynamicService } from './dynamic.service';

@NgModule({
  imports: [WpxModule, PortalModule],
  declarations: [WpxDynamicComponent],
  exports: [WpxDynamicComponent],
  providers: [DynamicService]
})
export class WpxDynamicModule {}
