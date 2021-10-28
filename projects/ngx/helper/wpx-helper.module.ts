import { NgModule } from '@angular/core';

import { WpxFormSubmitDirective } from './wpx-form-submit.directive';
import { WpxUploadDirective } from './wpx-upload.directive';

@NgModule({
  declarations: [WpxFormSubmitDirective, WpxUploadDirective],
  exports: [WpxFormSubmitDirective, WpxUploadDirective]
})
export class WpxHelperModule {}
