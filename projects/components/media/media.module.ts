import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WpxMediaPictureComponent } from './input/picture.component';
import { WpxMediaVideoComponent } from './input/video.component';
import { WpxMediaComponent } from './media.component';
import { MediaService } from './media.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, ScrollingModule],
  declarations: [WpxMediaComponent, WpxMediaPictureComponent, WpxMediaVideoComponent],
  exports: [WpxMediaComponent, WpxMediaPictureComponent, WpxMediaVideoComponent],
  providers: [MediaService]
})
export class WpxMediaModule {}
