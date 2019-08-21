import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitSearchClearDirective} from './directive/bit-search-clear.directive';
import {BitSearchStartDirective} from './directive/bit-search-start.directive';
import {BitSearchChangeDirective} from './directive/bit-search-change.directive';
import {BitFormSubmitDirective} from './directive/bit-form-submit.directive';
import {BitFormLabelColDirective} from './directive/bit-form-label-col.directive';
import {BitFormControlColDirective} from './directive/bit-form-control-col.directive';
import {BitBackDirective} from './directive/bit-back.directive';
import {BitStatusChangeDirective} from './directive/bit-status-change.directive';
import {BitUploadDirective} from './directive/bit-upload.directive';
import {BitOpenDirective} from './directive/bit-open.directive';
import {BitCrossLevelDirective} from './directive/bit-cross-level.directive';
import {BitI18nUpdateDirective} from './directive/bit-i18n-update.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormSubmitDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective,
    BitOpenDirective,
    BitCrossLevelDirective,
    BitBackDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nUpdateDirective
  ],
  declarations: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormSubmitDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective,
    BitOpenDirective,
    BitCrossLevelDirective,
    BitBackDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nUpdateDirective
  ],
})
export class NgxBitDirectiveModule {
}
