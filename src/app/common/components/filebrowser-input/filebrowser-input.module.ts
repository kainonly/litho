import { NgModule } from '@angular/core';

import { PicturesInputComponent } from '@common/components/filebrowser-input/pictures-input.component';
import { VideosInputComponent } from '@common/components/filebrowser-input/videos-input.component';
import { ShareModule } from '@common/share.module';
import { WpxFilebrowserModule } from '@weplanx/ng/filebrowser';

@NgModule({
  imports: [ShareModule, WpxFilebrowserModule],
  declarations: [PicturesInputComponent, VideosInputComponent],
  exports: [PicturesInputComponent, VideosInputComponent]
})
export class FilebrowserInputModule {}
