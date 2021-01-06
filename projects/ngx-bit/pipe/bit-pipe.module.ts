import { NgModule } from '@angular/core';
import { UndefinedPipe } from './undefined.pipe';
import { EmptyArrayPipe } from './empty-array.pipe';
import { EmptyObjectPipe } from './empty-object.pipe';
import { JsonParsePipe } from './json-parse.pipe';
import { LocalePipe } from './locale.pipe';
import { SplitPipe } from './split.pipe';
import { JoinPipe } from './join.pipe';
import { PrintPipe } from './print.pipe';
import { PrivacyPipe } from './privacy.pipe';

@NgModule({
  exports: [
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    JsonParsePipe,
    LocalePipe,
    SplitPipe,
    JoinPipe,
    PrintPipe,
    PrivacyPipe
  ],
  declarations: [
    UndefinedPipe,
    EmptyArrayPipe,
    EmptyObjectPipe,
    JsonParsePipe,
    LocalePipe,
    SplitPipe,
    JoinPipe,
    PrintPipe,
    PrivacyPipe
  ]
})
export class BitPipeModule {
}
