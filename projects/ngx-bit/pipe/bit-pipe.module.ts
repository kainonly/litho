import { NgModule } from '@angular/core';

import { EmptyPipe } from './empty.pipe';
import { JoinPipe } from './join.pipe';
import { ObjectPipe } from './object.pipe';
import { SortPipe } from './sort.pipe';
import { SplitPipe } from './split.pipe';

@NgModule({
  exports: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, SortPipe],
  declarations: [EmptyPipe, JoinPipe, SplitPipe, ObjectPipe, SortPipe]
})
export class BitPipeModule {}
