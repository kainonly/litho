import { NgModule } from '@angular/core';

import { WpxShareModule } from '@weplanx/common';

import { WpxMediaPictureComponent } from './input/picture.component';
import { WpxMediaVideoComponent } from './input/video.component';
import { MediaService } from './media.service';

@NgModule({
  imports: [WpxShareModule],
  declarations: [WpxMediaPictureComponent, WpxMediaVideoComponent],
  exports: [WpxMediaPictureComponent, WpxMediaVideoComponent],
  providers: [MediaService]
})
export class WpxMediaModule {}
