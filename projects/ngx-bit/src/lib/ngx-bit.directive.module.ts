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

@NgModule({
  imports: [CommonModule],
  exports: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormSubmitDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective,
    BitBackDirective,
    BitExplainDirective,
    BitStatusChangeDirective
  ],
  declarations: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormSubmitDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective,
    BitBackDirective,
    BitExplainDirective,
    BitStatusChangeDirective
  ],
})
export class NgxBitDirectiveModule {
}
