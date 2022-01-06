import { NgModule } from '@angular/core';

import { WpxSubmitDirective } from './directives/submit.directive';
import { WpxUploadDirective } from './directives/upload.directive';
import { WpxEmptyPipe } from './pipes/empty.pipe';
import { WpxJoinPipe } from './pipes/join.pipe';
import { WpxMapPipe } from './pipes/map.pipe';
import { WpxObjectPipe } from './pipes/object.pipe';
import { WpxSortPipe } from './pipes/sort.pipe';
import { WpxSplitPipe } from './pipes/split.pipe';

@NgModule({
  declarations: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe
  ],
  exports: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe
  ]
})
export class WpxModule {}
