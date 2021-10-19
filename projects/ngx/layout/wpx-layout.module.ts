import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxPipesModule } from '@weplanx/ngx/pipes';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { WpxAutoOpenPipe } from './wpx-auto-open.pipe';
import { WpxAutoRouterPipe } from './wpx-auto-router.pipe';
import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutContentDirective } from './wpx-layout-content.directive';
import { WpxLayoutFooterDirective } from './wpx-layout-footer.directive';
import { WpxLayoutTagsDirective } from './wpx-layout-tags.directive';
import { WpxLayoutActivated } from './wpx-layout.activated';
import { WpxLayoutComponent } from './wpx-layout.component';
import { WpxLayoutService } from './wpx-layout.service';
import { WpxNavComponent } from './wpx-nav/wpx-nav.component';
import { WpxPageHeaderComponent } from './wpx-page-header/wpx-page-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    WpxPipesModule
  ],
  declarations: [
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxLayoutFooterDirective,
    WpxLayoutTagsDirective,
    WpxLayoutContentDirective,
    WpxLayoutComponent,
    WpxNavComponent,
    WpxPageHeaderComponent,
    WpxAutoOpenPipe,
    WpxAutoRouterPipe
  ],
  exports: [
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxLayoutFooterDirective,
    WpxLayoutTagsDirective,
    WpxLayoutContentDirective,
    WpxLayoutComponent,
    WpxNavComponent,
    WpxPageHeaderComponent
  ]
})
export class WpxLayoutModule {
  static forRoot(): ModuleWithProviders<WpxLayoutModule> {
    return {
      ngModule: WpxLayoutModule,
      providers: [WpxLayoutService, WpxLayoutActivated]
    };
  }
}
