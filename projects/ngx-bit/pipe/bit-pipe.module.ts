import { NgModule } from '@angular/core';

import { EmptyPipe } from './empty.pipe';
import { JoinPipe } from './join.pipe';
import { ObjectPipe } from './object.pipe';
import { PrivacyPipe } from './privacy.pipe';
import { SplitPipe } from './split.pipe';

@NgModule({
  exports: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, PrivacyPipe],
  declarations: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, PrivacyPipe]
})
export class BitPipeModule {}
