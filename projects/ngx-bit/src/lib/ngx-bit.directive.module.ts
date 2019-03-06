import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitSearchClearDirective} from './directive/bit-search-clear.directive';
import {BitSearchStartDirective} from './directive/bit-search-start.directive';
import {BitSearchChangeDirective} from './directive/bit-search-change.directive';
import {BitFormDirective} from './directive/bit-form.directive';
import {BitFormLabelColDirective} from './directive/bit-form-label-col.directive';
import {BitFormControlColDirective} from './directive/bit-form-control-col.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective
  ],
  declarations: [
    BitSearchStartDirective,
    BitSearchClearDirective,
    BitSearchChangeDirective,
    BitFormDirective,
    BitFormControlColDirective,
    BitFormLabelColDirective
  ]
})
export class NgxBitDirectiveModule {
}
