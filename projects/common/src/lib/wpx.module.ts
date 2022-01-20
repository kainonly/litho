import { NgModule } from '@angular/core';

import { WpxAssetsDirective } from './directives/assets.directive';
import { WpxSubmitDirective } from './directives/submit.directive';
import { WpxUploadDirective } from './directives/upload.directive';
import { WpxHeaderComponent } from './header/header.component';
import { WpxLayoutActionDirective } from './layout/layout-action.directive';
import { WpxLayoutAlertDirective } from './layout/layout-alert.directive';
import { WpxLayoutComponent } from './layout/layout.component';
import { IsPageArrayPipe } from './nav/is-page-array.pipe';
import { WpxNavComponent } from './nav/nav.component';
import { OpenStatePipe } from './nav/open-state.pipe';
import { WpxPageHeaderComponent } from './page-header/page-header.component';
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
    WpxAssetsDirective,
    WpxHeaderComponent,
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxNavComponent,
    WpxPageHeaderComponent,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe,
    IsPageArrayPipe,
    OpenStatePipe
  ],
  exports: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxAssetsDirective,
    WpxHeaderComponent,
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxNavComponent,
    WpxPageHeaderComponent,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe
  ]
})
export class WpxModule {}
