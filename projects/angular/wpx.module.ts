import { NgModule } from '@angular/core';

import { WpxRetryDirective } from './directives/retry.directive';
import { WpxSubmitDirective } from './directives/submit.directive';
import { WpxUploadDirective } from './directives/upload.directive';
import { WpxAssetsPipe } from './pipes/assets.pipe';
import { WpxEmptyPipe } from './pipes/empty.pipe';
import { WpxJoinPipe } from './pipes/join.pipe';
import { WpxMapPipe } from './pipes/map.pipe';
import { WpxObjectPipe } from './pipes/object.pipe';
import { WpxSortPipe } from './pipes/sort.pipe';
import { WpxSplitPipe } from './pipes/split.pipe';
import { WpxShareModule } from './share.module';

@NgModule({
  imports: [WpxShareModule],
  declarations: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxRetryDirective,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe,
    WpxAssetsPipe
  ],
  exports: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxRetryDirective,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe,
    WpxAssetsPipe
  ]
})
export class WpxModule {}
