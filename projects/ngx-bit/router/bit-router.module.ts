import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitHeaderActionDirective } from './bit-header/bit-header-action.directive';
import { BitHeaderBannerDirective } from './bit-header/bit-header-banner.directive';
import { BitHeaderFooterDirective } from './bit-header/bit-header-footer.directive';
import { BitHeaderTagsDirective } from './bit-header/bit-header-tags.directive';
import { BitHeaderComponent } from './bit-header/bit-header.component';
import { BitPageHeaderComponent } from './bit-page-header/bit-page-header.component';
import { BitRouterService } from './bit-router.service';
import { BitSiderComponent } from './bit-sider/bit-sider.component';

@NgModule({
  imports: [
    NzMenuModule,
    NzIconModule,
    BitDirectiveModule,
    BitPipeModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    RouterModule,
    CommonModule,
    NzSpaceModule
  ],
  declarations: [
    BitSiderComponent,
    BitPageHeaderComponent,
    BitHeaderComponent,
    BitHeaderActionDirective,
    BitHeaderBannerDirective,
    BitHeaderTagsDirective,
    BitHeaderFooterDirective
  ],
  exports: [
    BitSiderComponent,
    BitPageHeaderComponent,
    BitHeaderComponent,
    BitHeaderActionDirective,
    BitHeaderBannerDirective,
    BitHeaderTagsDirective,
    BitHeaderFooterDirective
  ],
  providers: [BitRouterService]
})
export class BitRouterModule {}
