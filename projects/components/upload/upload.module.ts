import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { WpxUploadAvatarComponent } from './avatar/avatar.component';
import { WpxUploadTransportComponent } from './transport/transport.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, ScrollingModule, NzProgressModule],
  declarations: [WpxUploadAvatarComponent, WpxUploadTransportComponent],
  exports: [WpxUploadAvatarComponent, WpxUploadTransportComponent]
})
export class WpxUploadModule {}
