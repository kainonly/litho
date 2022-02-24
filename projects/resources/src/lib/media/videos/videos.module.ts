import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxUploadModule } from '@weplanx/components/upload';

import { VideosComponent } from './videos.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule],
  declarations: [VideosComponent]
})
export class VideosModule {}
