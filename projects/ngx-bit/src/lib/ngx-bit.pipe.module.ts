import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefinedPipe} from './pipe/defined.pipe';
import {UndefinedPipe} from './pipe/undefined.pipe';
import {EmptyArrayPipe} from './pipe/empty-array.pipe';
import {EmptyObjectPipe} from './pipe/empty-object.pipe';
import {ObjectToArrayPipe} from './pipe/object-to-array.pipe';
import {ObjectToMapPipe} from './pipe/object-to-map.pipe';
import {JsonParsePipe} from './pipe/json-parse.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [
    DefinedPipe,
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    ObjectToArrayPipe,
    ObjectToMapPipe,
    JsonParsePipe
  ],
  declarations: [
    DefinedPipe,
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    ObjectToArrayPipe,
    ObjectToMapPipe,
    JsonParsePipe
  ]
})
export class NgxBitPipeModule {
}
