import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { MediaService } from './media.service';
import { WpxMediaPictureComponent } from './picture.component';
import { WpxMediaVideoComponent } from './video.component';
import { DetailComponent } from './view/detail/detail.component';
import { FormComponent } from './view/form/form.component';
import { WpxMediaViewComponent } from './view/view.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzImageModule, NzTypographyModule, ScrollingModule],
  declarations: [
    WpxMediaPictureComponent,
    WpxMediaVideoComponent,
    WpxMediaViewComponent,
    FormComponent,
    DetailComponent
  ],
  exports: [WpxMediaPictureComponent, WpxMediaVideoComponent, WpxMediaViewComponent],
  providers: [MediaService]
})
export class WpxMediaModule {}
