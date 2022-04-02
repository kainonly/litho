import { NgModule } from '@angular/core';

import { WpxRetryDirective } from './directives/retry.directive';
import { WpxSubmitDirective } from './directives/submit.directive';
import { WpxUploadDirective } from './directives/upload.directive';
import { WpxHeaderComponent } from './header/header.component';
import { WpxNavComponent } from './nav/nav.component';
import { OpenStatePipe } from './nav/open-state.pipe';
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
    WpxHeaderComponent,
    WpxNavComponent,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe,
    WpxAssetsPipe,
    OpenStatePipe
  ],
  exports: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxRetryDirective,
    WpxHeaderComponent,
    WpxNavComponent,
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
