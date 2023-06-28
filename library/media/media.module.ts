import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { WpxModule, WpxService, WpxShareModule } from '@weplanx/ng';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { FormComponent } from './form/form.component';
import { WpxMediaInputComponent } from './media-input.component';
import { WpxMediaComponent } from './media.component';
import { PictureComponent } from './picture/picture.component';
import { PicturesService } from './services/pictures.service';
import { VideosService } from './services/videos.service';
import { OPTION, Option } from './types';
import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [ScrollingModule, DragDropModule, WpxModule, WpxUploadModule, WpxShareModule],
  declarations: [WpxMediaComponent, WpxMediaInputComponent, FormComponent, PictureComponent, VideoComponent],
  exports: [WpxMediaComponent, WpxMediaInputComponent]
})
export class WpxMediaModule {
  static forRoot(option: Option): ModuleWithProviders<WpxMediaModule> {
    return {
      ngModule: WpxMediaModule,
      providers: [{ provide: OPTION, useValue: option }, PicturesService, VideosService]
    };
  }

  constructor(@Inject(OPTION) option: Option, wpx: WpxService) {
    wpx.loadScript('media', option.url, option.plugins);
  }
}
