import { NgModule } from '@angular/core';

import { WpxSubmitDirective } from './wpx-submit.directive';
import { WpxUploadDirective } from './wpx-upload.directive';

@NgModule({
  declarations: [WpxSubmitDirective, WpxUploadDirective],
  exports: [WpxSubmitDirective, WpxUploadDirective]
})
export class WpxHelperModule {}
