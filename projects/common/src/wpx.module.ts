import { NgModule } from '@angular/core';

import { WpxSubmitDirective } from './directives/wpx-submit.directive';
import { WpxUploadDirective } from './directives/wpx-upload.directive';
import { WpxEmptyPipe } from './pipes/wpx-empty.pipe';
import { WpxJoinPipe } from './pipes/wpx-join.pipe';
import { WpxMapPipe } from './pipes/wpx-map.pipe';
import { WpxObjectPipe } from './pipes/wpx-object.pipe';
import { WpxSortPipe } from './pipes/wpx-sort.pipe';
import { WpxSplitPipe } from './pipes/wpx-split.pipe';

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
  exports: [WpxSubmitDirective, WpxUploadDirective]
})
export class WpxModule {}
