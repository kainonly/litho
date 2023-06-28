import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxUploadAvatarComponent } from './avatar/avatar.component';
import { WpxUploadTransportComponent } from './transport/transport.component';

@NgModule({
  imports: [WpxModule, ScrollingModule, WpxShareModule],
  declarations: [WpxUploadAvatarComponent, WpxUploadTransportComponent],
  exports: [WpxUploadAvatarComponent, WpxUploadTransportComponent]
})
export class WpxUploadModule {}
