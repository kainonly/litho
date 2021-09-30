import { NgModule } from '@angular/core';

import { WpxFormSubmitDirective } from './wpx-form-submit.directive';
import { WpxSearchChangeDirective } from './wpx-search-change.directive';
import { WpxSearchClearDirective } from './wpx-search-clear.directive';
import { WpxSearchStartDirective } from './wpx-search-start.directive';
import { WpxUploadDirective } from './wpx-upload.directive';

@NgModule({
  declarations: [
    WpxFormSubmitDirective,
    WpxSearchChangeDirective,
    WpxSearchClearDirective,
    WpxSearchStartDirective,
    WpxUploadDirective
  ],
  exports: [
    WpxFormSubmitDirective,
    WpxSearchChangeDirective,
    WpxSearchClearDirective,
    WpxSearchStartDirective,
    WpxUploadDirective
  ]
})
export class WpxHelperModule {}
