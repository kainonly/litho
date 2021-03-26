import { NgModule } from '@angular/core';
import { BitSearchClearDirective } from './bit-search-clear.directive';
import { BitSearchStartDirective } from './bit-search-start.directive';
import { BitSearchChangeDirective } from './bit-search-change.directive';
import { BitColDirective } from './bit-col.directive';
import { BitFormSubmitDirective } from './bit-form-submit.directive';
import { BitBackDirective } from './bit-back.directive';
import { BitStatusChangeDirective } from './bit-status-change.directive';
import { BitUploadDirective } from './bit-upload.directive';
import { BitOpenDirective } from './bit-open.directive';
import { BitHistoryDirective } from './bit-history.directive';
import { BitI18nUpdateDirective } from './bit-i18n-update.directive';

@NgModule({
  exports: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitColDirective,
    BitFormSubmitDirective,
    BitOpenDirective,
    BitHistoryDirective,
    BitBackDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nUpdateDirective
  ],
  declarations: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitColDirective,
    BitFormSubmitDirective,
    BitOpenDirective,
    BitHistoryDirective,
    BitBackDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nUpdateDirective
  ]
})
export class BitDirectiveModule {
}
