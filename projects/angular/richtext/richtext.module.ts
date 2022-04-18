import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
