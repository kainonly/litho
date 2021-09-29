import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxPipesModule } from '@weplanx/framework/pipes';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { WpxElementActionDirective } from './wpx-element/wpx-element-action.directive';
import { WpxElementAlertDirective } from './wpx-element/wpx-element-alert.directive';
import { WpxElementFooterDirective } from './wpx-element/wpx-element-footer.directive';
import { WpxElementTagsDirective } from './wpx-element/wpx-element-tags.directive';
import { WpxElementComponent } from './wpx-element/wpx-element.component';
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
    WpxElementActionDirective,
    WpxElementAlertDirective,
    WpxElementFooterDirective,
    WpxElementTagsDirective,
    WpxElementComponent,
    WpxNavComponent,
    WpxPageHeaderComponent,
    WpxAutoOpenPipe
  ],
  exports: [
    WpxElementActionDirective,
    WpxElementAlertDirective,
    WpxElementFooterDirective,
    WpxElementTagsDirective,
    WpxElementComponent,
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
