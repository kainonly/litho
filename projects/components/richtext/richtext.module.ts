import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxMediaModule } from '@weplanx/components/media';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
