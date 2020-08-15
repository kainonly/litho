import { NgModule } from '@angular/core';
import { DefinedPipe } from './defined.pipe';
import { UndefinedPipe } from './undefined.pipe';
import { EmptyArrayPipe } from './empty-array.pipe';
import { EmptyObjectPipe } from './empty-object.pipe';
import { JsonParsePipe } from './json-parse.pipe';
import { LocalePipe } from './locale.pipe';
import { SplitPipe } from './split.pipe';
import { JoinPipe } from './join.pipe';
import { PrivacyPipe } from './privacy.pipe';

@NgModule({
  exports: [
    DefinedPipe,
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    JsonParsePipe,
    LocalePipe,
    SplitPipe,
    JoinPipe,
    PrivacyPipe
  ],
  declarations: [
    DefinedPipe,
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    JsonParsePipe,
    LocalePipe,
    SplitPipe,
    JoinPipe,
    PrivacyPipe
  ]
})
export class BitPipeModule {
}
