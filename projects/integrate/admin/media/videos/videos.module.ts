import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { VideosComponent } from './videos.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule],
  declarations: [VideosComponent]
})
export class VideosModule {}
