import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitRouterService } from 'ngx-bit/router';

import { BitPageHeaderComponent } from './bit-page-header/bit-page-header.component';
import { BitPhActionDirective } from './bit-page-header/bit-ph-action.directive';
import { BitPhComponent } from './bit-page-header/bit-ph.component';
import { BitSiderMenuComponent } from './bit-sider-menu/bit-sider-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    BitPipeModule
  ],
  declarations: [BitSiderMenuComponent, BitPageHeaderComponent, BitPhComponent, BitPhActionDirective],
  exports: [BitSiderMenuComponent, BitPageHeaderComponent, BitPhComponent, BitPhActionDirective]
})
export class BitRouterModule {
  static forRoot(): ModuleWithProviders<BitRouterModule> {
    return {
      ngModule: BitRouterModule,
      providers: [BitRouterService]
    };
  }
}
