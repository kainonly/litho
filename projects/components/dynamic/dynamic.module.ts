import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';

import { WpxDynamicComponent } from './dynamic.component';

@NgModule({
  imports: [WpxModule],
  declarations: [WpxDynamicComponent],
  exports: [WpxDynamicComponent]
})
export class WpxDynamicModule {}
