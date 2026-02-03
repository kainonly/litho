import { NgModule } from '@angular/core';

import { BlankPipe } from '../pipes/blank.pipe';
import { DatePipe } from '../pipes/date.pipe';
import { EmptyDatePipe } from '../pipes/empty-date.pipe';
import { EmptyPipe } from '../pipes/empty.pipe';
import { JoinPipe } from '../pipes/join.pipe';
import { MapPipe } from '../pipes/map.pipe';
import { ObjectPipe } from '../pipes/object.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { SplitPipe } from '../pipes/split.pipe';

@NgModule({
  imports: [BlankPipe, EmptyPipe, EmptyDatePipe, JoinPipe, MapPipe, ObjectPipe, SortPipe, SplitPipe, DatePipe],
  exports: [BlankPipe, EmptyPipe, EmptyDatePipe, JoinPipe, MapPipe, ObjectPipe, SortPipe, SplitPipe, DatePipe]
})
export class PipesModule {}
