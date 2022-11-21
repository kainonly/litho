import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';

import { WpxRichtextComponent } from './richtext.component';
import { WpxRichtextService } from './richtext.service';

@NgModule({
  imports: [WpxModule, WpxMediaModule, WpxShareModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent],
  providers: [WpxRichtextService]
})
export class WpxRichtextModule {}
