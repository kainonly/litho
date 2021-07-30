import { NgModule } from '@angular/core';

import { BitFormSubmitDirective } from './bit-form-submit.directive';
import { BitSearchChangeDirective } from './bit-search-change.directive';
import { BitSearchClearDirective } from './bit-search-clear.directive';
import { BitSearchStartDirective } from './bit-search-start.directive';
import { BitStatusChangeDirective } from './bit-status-change.directive';
import { BitUploadDirective } from './bit-upload.directive';

@NgModule({
  declarations: [
    BitFormSubmitDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ],
  exports: [
    BitFormSubmitDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ]
})
export class BitDirectiveModule {}
