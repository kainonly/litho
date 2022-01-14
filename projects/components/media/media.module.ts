import { NgModule } from '@angular/core';

import { WpxShareModule } from '@weplanx/common';

import { MediaService } from './media.service';
import { WpxPictureComponent } from './picture.component';
import { WpxVideoComponent } from './video.component';

@NgModule({
  imports: [WpxShareModule],
  declarations: [WpxPictureComponent, WpxVideoComponent],
  exports: [WpxPictureComponent, WpxVideoComponent],
  providers: [MediaService]
})
export class WpxMediaModule {}
