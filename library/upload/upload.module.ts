import { NgModule } from '@angular/core';

import { WpxUploadAvatarComponent } from './avatar/avatar.component';
import { WpxUploadTransportComponent } from './transport/transport.component';

@NgModule({
  imports: [WpxUploadAvatarComponent, WpxUploadTransportComponent],
  exports: [WpxUploadAvatarComponent, WpxUploadTransportComponent]
})
export class WpxUploadModule {}
