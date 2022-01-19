import { Component, NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { VideosComponent } from './videos.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [VideosComponent]
})
export class VideosModule {}
