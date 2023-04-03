import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { VideosComponent } from './videos.component';

@NgModule({
  imports: [ShareModule],
  declarations: [VideosComponent],
  exports: [VideosComponent]
})
export class VideosModule {}
