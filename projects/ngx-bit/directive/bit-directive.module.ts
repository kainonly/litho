import { NgModule } from '@angular/core';

import { BitBackDirective } from './bit-back.directive';
import { BitFormSubmitDirective } from './bit-form-submit.directive';
import { BitGridDirective } from './bit-grid.directive';
import { BitHistoryDirective } from './bit-history.directive';
import { BitI18nUpdateDirective } from './bit-i18n-update.directive';
import { BitOpenDirective } from './bit-open.directive';
import { BitSearchChangeDirective } from './bit-search-change.directive';
import { BitSearchClearDirective } from './bit-search-clear.directive';
import { BitSearchStartDirective } from './bit-search-start.directive';
import { BitStatusChangeDirective } from './bit-status-change.directive';
import { BitUploadDirective } from './bit-upload.directive';

@NgModule({
  declarations: [
    BitBackDirective,
    BitGridDirective,
    BitFormSubmitDirective,
    BitHistoryDirective,
    BitI18nUpdateDirective,
    BitOpenDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ],
  exports: [
    BitBackDirective,
    BitGridDirective,
    BitFormSubmitDirective,
    BitHistoryDirective,
    BitI18nUpdateDirective,
    BitOpenDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ]
})
export class BitDirectiveModule {}
