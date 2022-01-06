import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { IsPageArrayPipe } from './nav/is-page-array.pipe';
import { OpenStatePipe } from './nav/open-state.pipe';
import { WpxNavComponent } from './nav/wpx-nav.component';
import { WpxPageHeaderComponent } from './page-header/wpx-page-header.component';
import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutComponent } from './wpx-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzIconModule,
    NzSpaceModule,
    NzBreadCrumbModule,
    WpxModule
  ],
  declarations: [
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxNavComponent,
    WpxPageHeaderComponent,
    OpenStatePipe,
    IsPageArrayPipe
  ],
  exports: [
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxNavComponent,
    WpxPageHeaderComponent
  ]
})
export class WpxLayoutModule {}
