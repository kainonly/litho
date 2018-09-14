import {NgModule} from '@angular/core';

import {EmptyObjectPipe} from './pipe/empty-object.pipe';
import {JsonParsePipe} from './pipe/json-parse.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    EmptyObjectPipe,
    JsonParsePipe
  ],
  declarations: [
    EmptyObjectPipe,
    JsonParsePipe
  ]
})
export class NgxBitPipeModule {
}
