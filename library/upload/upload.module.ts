import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxUploadAvatarComponent } from './avatar/avatar.component';
import { WpxUploadTransportComponent } from './transport/transport.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, ScrollingModule, NzProgressModule, NzImageModule, NzTypographyModule],
  declarations: [WpxUploadAvatarComponent, WpxUploadTransportComponent],
  exports: [WpxUploadAvatarComponent, WpxUploadTransportComponent]
})
export class WpxUploadModule {}
