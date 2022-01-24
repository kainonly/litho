import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { MediaService } from './media.service';
import { WpxMediaPictureComponent } from './picture.component';
import { WpxMediaVideoComponent } from './video.component';
import { FormComponent } from './view/form/form.component';
import { SettingComponent } from './view/setting/setting.component';
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
    WpxMediaPictureComponent,
    WpxMediaVideoComponent,
    WpxMediaViewComponent,
    FormComponent,
    SettingComponent
  ],
  exports: [WpxMediaPictureComponent, WpxMediaVideoComponent, WpxMediaViewComponent],
  providers: [MediaService]
})
export class WpxMediaModule {}
