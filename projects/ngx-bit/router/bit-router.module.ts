import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitRouterService } from 'ngx-bit/router';

import { BitPageHeaderComponent } from './bit-page-header/bit-page-header.component';
import { BitPhActionDirective } from './bit-ph/bit-ph-action.directive';
import { BitPhAlertDirective } from './bit-ph/bit-ph-alert.directive';
import { BitPhFooterDirective } from './bit-ph/bit-ph-footer.directive';
import { BitPhTagsDirective } from './bit-ph/bit-ph-tags.directive';
import { BitPhComponent } from './bit-ph/bit-ph.component';
import { BitSiderMenuComponent } from './bit-sider-menu/bit-sider-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    BitPipeModule
  ],
  declarations: [
    BitSiderMenuComponent,
    BitPageHeaderComponent,
    BitPhComponent,
    BitPhAlertDirective,
    BitPhTagsDirective,
    BitPhActionDirective,
    BitPhFooterDirective
  ],
  exports: [
    BitSiderMenuComponent,
    BitPageHeaderComponent,
    BitPhComponent,
    BitPhAlertDirective,
    BitPhTagsDirective,
    BitPhActionDirective,
    BitPhFooterDirective
  ]
})
export class BitRouterModule {
  static forRoot(): ModuleWithProviders<BitRouterModule> {
    return {
      ngModule: BitRouterModule,
      providers: [BitRouterService]
    };
  }
}
