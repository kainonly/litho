import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitSearchClearDirective} from './directive/bit-search-clear.directive';
import {BitSearchStartDirective} from './directive/bit-search-start.directive';
import {BitSearchChangeDirective} from './directive/bit-search-change.directive';
import {BitFormSubmitDirective} from './directive/bit-form-submit.directive';
import {BitFormLabelColDirective} from './directive/bit-form-label-col.directive';
import {BitFormControlColDirective} from './directive/bit-form-control-col.directive';
import {BitBackDirective} from './directive/bit-back.directive';
import {BitExplainDirective} from './directive/bit-explain.directive';
import {BitStatusChangeDirective} from './directive/bit-status-change.directive';
import {BitUploadDirective} from './directive/bit-upload.directive';
import {BitI18nTipsStyleDirective} from './directive/bit-i18n-tips-style.directive';
import {BitOpenDirective} from './directive/bit-open.directive';
import {BitCrossLevelDirective} from './directive/bit-cross-level.directive';

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
    BitExplainDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nTipsStyleDirective
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
    BitExplainDirective,
    BitStatusChangeDirective,
    BitUploadDirective,
    BitI18nTipsStyleDirective
  ],
})
export class NgxBitDirectiveModule {
}
