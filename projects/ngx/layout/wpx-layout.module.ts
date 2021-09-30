import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxPipesModule } from '@weplanx/ngx/pipes';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutFooterDirective } from './wpx-layout-footer.directive';
import { WpxLayoutTagsDirective } from './wpx-layout-tags.directive';
import { WpxLayoutComponent } from './wpx-layout.component';
import { WpxLayoutService } from './wpx-layout.service';
import { WpxAutoOpenPipe } from './wpx-nav/wpx-auto-open.pipe';
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
    WpxLayoutComponent,
    WpxNavComponent,
    WpxPageHeaderComponent,
    WpxAutoOpenPipe
  ],
  exports: [
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxLayoutFooterDirective,
    WpxLayoutTagsDirective,
    WpxLayoutComponent,
    WpxNavComponent,
    WpxPageHeaderComponent
  ]
})
export class WpxLayoutModule {
  static forRoot(): ModuleWithProviders<WpxLayoutModule> {
    return {
      ngModule: WpxLayoutModule,
      providers: [WpxLayoutService]
    };
  }
}
