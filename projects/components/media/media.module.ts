import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxMediaPicturesComponent } from './pictures.component';
import { PicturesService } from './pictures.service';
import { WpxMediaVideosComponent } from './videos.component';
import { VideosService } from './videos.service';
import { FormComponent } from './view/form/form.component';
import { PictureComponent } from './view/picture/picture.component';
import { VideoComponent } from './view/video/video.component';
import { WpxMediaViewComponent } from './view/view.component';

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    NzImageModule,
    NzTypographyModule,
    ScrollingModule,
    NzDescriptionsModule,
    NzPipesModule
  ],
  declarations: [
    WpxMediaPicturesComponent,
    WpxMediaVideosComponent,
    WpxMediaViewComponent,
    FormComponent,
    PictureComponent,
    VideoComponent
  ],
  exports: [WpxMediaPicturesComponent, WpxMediaVideosComponent, WpxMediaViewComponent],
  providers: [PicturesService, VideosService]
})
export class WpxMediaModule {}
