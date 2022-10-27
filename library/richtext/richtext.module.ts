import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxMediaModule, WpxShareModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
