import { NgModule } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { AutoRouterPipe } from './auto-router.pipe';
import { WpxNavComponent } from './nav/wpx-nav.component';
import { OpenStatePipe } from './open-state.pipe';
import { WpxPageHeaderComponent } from './page-header/wpx-page-header.component';
import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutComponent } from './wpx-layout.component';

@NgModule({
  imports: [NzPageHeaderModule, NzSpaceModule, NzBreadCrumbModule],
  declarations: [
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxNavComponent,
    WpxPageHeaderComponent,
    AutoRouterPipe,
    OpenStatePipe
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
