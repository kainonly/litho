import { NgModule } from '@angular/core';

import { EmptyPipe } from './empty.pipe';
import { JoinPipe } from './join.pipe';
import { ObjectPipe } from './object.pipe';
import { SplitPipe } from './split.pipe';

@NgModule({
  exports: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe],
  declarations: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe]
})
export class BitPipeModule {}
