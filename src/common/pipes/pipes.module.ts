import { NgModule } from '@angular/core';
import { AssetsPipe } from '@common/pipes/assets.pipe';
import { BlankPipe } from '@common/pipes/blank.pipe';
import { EmptyPipe } from '@common/pipes/empty.pipe';
import { JoinPipe } from '@common/pipes/join.pipe';
import { MapPipe } from '@common/pipes/map.pipe';
import { ObjectPipe } from '@common/pipes/object.pipe';
import { SortPipe } from '@common/pipes/sort.pipe';
import { SplitPipe } from '@common/pipes/split.pipe';
import { PercentPipe } from '@common/pipes/percent.pipe';
import { VolumnPipe } from '@common/pipes/volumn.pipe';
import { WeightPipe } from '@common/pipes/weight.pipe';

@NgModule({
  imports: [
    AssetsPipe,
    BlankPipe,
    EmptyPipe,
    JoinPipe,
    MapPipe,
    ObjectPipe,
    SortPipe,
    SplitPipe,
    PercentPipe,
    WeightPipe,
    VolumnPipe
  ],
  exports: [
    AssetsPipe,
    BlankPipe,
    EmptyPipe,
    JoinPipe,
    MapPipe,
    ObjectPipe,
    SortPipe,
    SplitPipe,
    PercentPipe,
    WeightPipe,
    VolumnPipe
  ]
})
export class PipesModule {}
