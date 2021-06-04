import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BitRouterService } from './bit-router.service';
import { BitSiderComponent } from './bit-sider/bit-sider.component';
import { BitHeaderComponent } from './bit-header/bit-header.component';
import { BitPageHeaderComponent } from './bit-page-header/bit-page-header.component';
import { BitHeaderActionDirective } from './bit-header/bit-header-action.directive';
import { BitHeaderBannerDirective } from './bit-header/bit-header-banner.directive';
import { BitHeaderTagsDirective } from './bit-header/bit-header-tags.directive';
import { BitHeaderFooterDirective } from './bit-header/bit-header-footer.directive';
import { NzSpaceModule } from 'ng-zorro-antd/space';

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
export class BitRouterModule {
}
