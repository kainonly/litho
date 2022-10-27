import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { WpxMediaComponent } from './media.component';
import { PicturesService } from './pictures.service';
import { VideosService } from './videos.service';
import { FormComponent } from './view/form/form.component';
import { PictureComponent } from './view/picture/picture.component';
import { VideoComponent } from './view/video/video.component';
import { WpxMediaViewComponent } from './view/view.component';

@NgModule({
  imports: [ScrollingModule, DragDropModule, WpxModule, WpxUploadModule, WpxShareModule],
  declarations: [WpxMediaComponent, WpxMediaViewComponent, FormComponent, PictureComponent, VideoComponent],
  exports: [WpxMediaComponent, WpxMediaViewComponent],
  providers: [PicturesService, VideosService]
})
export class WpxMediaModule {}
