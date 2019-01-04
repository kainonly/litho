import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitSearchClearDirective} from './directive/bit-search-clear.directive';
import {BitSearchStartDirective} from './directive/bit-search-start.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    BitSearchStartDirective,
    BitSearchClearDirective
  ],
  declarations: [
    BitSearchStartDirective,
    BitSearchClearDirective
  ]
})
export class NgxBitDirectiveModule {
}
