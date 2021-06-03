import { NgModule } from '@angular/core';
import { BitColDirective } from './bit-col.directive';
import { BitFormSubmitDirective } from './bit-form-submit.directive';
import { BitI18nUpdateDirective } from './bit-i18n-update.directive';
import { BitSearchChangeDirective } from './bit-search-change.directive';
import { BitSearchClearDirective } from './bit-search-clear.directive';
import { BitSearchStartDirective } from './bit-search-start.directive';
import { BitStatusChangeDirective } from './bit-status-change.directive';
import { BitUploadDirective } from './bit-upload.directive';

@NgModule({
  declarations: [
    BitColDirective,
    BitFormSubmitDirective,
    BitI18nUpdateDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ],
  exports: [
    BitColDirective,
    BitFormSubmitDirective,
    BitI18nUpdateDirective,
    BitSearchChangeDirective,
    BitSearchClearDirective,
    BitSearchStartDirective,
    BitStatusChangeDirective,
    BitUploadDirective
  ]
})
export class BitDirectiveModule {
}
