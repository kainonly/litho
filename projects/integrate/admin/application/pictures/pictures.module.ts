import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxUploadModule } from '@weplanx/components/upload';

import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, WpxMediaModule],
  declarations: [PicturesComponent]
})
export class PicturesModule {}
