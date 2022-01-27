import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxUploadModule } from '@weplanx/components/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxMediaComponent } from './media.component';
import { PicturesService } from './pictures.service';
import { VideosService } from './videos.service';
import { FormComponent } from './view/form/form.component';
import { PictureComponent } from './view/picture/picture.component';
import { VideoComponent } from './view/video/video.component';
import { WpxMediaViewComponent } from './view/view.component';

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    WpxUploadModule,
    NzImageModule,
    NzTypographyModule,
    ScrollingModule,
    DragDropModule,
    NzDescriptionsModule,
    NzPipesModule
  ],
  declarations: [WpxMediaComponent, WpxMediaViewComponent, FormComponent, PictureComponent, VideoComponent],
  exports: [WpxMediaComponent, WpxMediaViewComponent],
  providers: [PicturesService, VideosService]
})
export class WpxMediaModule {}
