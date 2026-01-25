import { BlankPipe } from '../pipes/blank.pipe';
import { DatePipe } from '../pipes/date.pipe';
import { EmptyDatePipe } from '../pipes/empty-date.pipe';
import { EmptyPipe } from '../pipes/empty.pipe';
import { JoinPipe } from '../pipes/join.pipe';
import { MapPipe } from '../pipes/map.pipe';
import { ObjectPipe } from '../pipes/object.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { SplitPipe } from '../pipes/split.pipe';

export const SHARED_PIPES = [
  BlankPipe,
  EmptyPipe,
  EmptyDatePipe,
  JoinPipe,
  MapPipe,
  ObjectPipe,
  SortPipe,
  SplitPipe,
  DatePipe
] as const;
