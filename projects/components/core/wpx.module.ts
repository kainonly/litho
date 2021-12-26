import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { WpxSubmitDirective } from './directives/wpx-submit.directive';
import { WpxUploadDirective } from './directives/wpx-upload.directive';
import { WpxLayoutActionDirective } from './layout/wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './layout/wpx-layout-alert.directive';
import { WpxLayoutComponent } from './layout/wpx-layout.component';
// import { WpxNavComponent } from './nav/wpx-nav.component';
import { WpxPageHeaderComponent } from './page-header/wpx-page-header.component';
import { WpxEmptyPipe } from './pipes/wpx-empty.pipe';
import { WpxJoinPipe } from './pipes/wpx-join.pipe';
import { WpxMapPipe } from './pipes/wpx-map.pipe';
import { WpxObjectPipe } from './pipes/wpx-object.pipe';
import { WpxSortPipe } from './pipes/wpx-sort.pipe';
import { WpxSplitPipe } from './pipes/wpx-split.pipe';
import { AutoRouterPipe } from './utils/auto-router.pipe';
import { OpenStatePipe } from './utils/open-state.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpaceModule
  ],
  declarations: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxLayoutComponent,
    WpxLayoutAlertDirective,
    WpxLayoutActionDirective,
    // WpxNavComponent,
    WpxPageHeaderComponent,
    WpxEmptyPipe,
    WpxJoinPipe,
    WpxSplitPipe,
    WpxObjectPipe,
    WpxMapPipe,
    WpxSortPipe,
    AutoRouterPipe,
    OpenStatePipe
  ],
  exports: [
    WpxSubmitDirective,
    WpxUploadDirective,
    WpxLayoutComponent,
    WpxLayoutAlertDirective,
    WpxLayoutActionDirective,
    // WpxNavComponent,
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
