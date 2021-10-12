import { NgModule } from '@angular/core';

import { WpxEmptyPipe } from './wpx-empty.pipe';
import { WpxJoinPipe } from './wpx-join.pipe';
import { WpxMapPipe } from './wpx-map.pipe';
import { WpxObjectPipe } from './wpx-object.pipe';
import { WpxSortPipe } from './wpx-sort.pipe';
import { WpxSplitPipe } from './wpx-split.pipe';

@NgModule({
  exports: [WpxEmptyPipe, WpxJoinPipe, WpxSplitPipe, WpxObjectPipe, WpxMapPipe, WpxSortPipe],
  declarations: [WpxEmptyPipe, WpxJoinPipe, WpxSplitPipe, WpxObjectPipe, WpxMapPipe, WpxSortPipe]
})
export class WpxPipesModule {}
