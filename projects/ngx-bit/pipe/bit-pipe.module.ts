import { NgModule } from '@angular/core';
import { EmptyPipe } from './empty.pipe';
import { JoinPipe } from './join.pipe';
import { SplitPipe } from './split.pipe';
import { ObjectPipe } from './object.pipe';
import { PrintPipe } from './print.pipe';
import { PrivacyPipe } from './privacy.pipe';

@NgModule({
  exports: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, PrintPipe, PrivacyPipe],
  declarations: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, PrintPipe, PrivacyPipe]
})
export class BitPipeModule {}
