import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitRouterService } from 'ngx-bit/router';

import { PageHeaderMixedComponent } from './page-header/page-header-mixed.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SiderMenuComponent } from './sider-menu/sider-menu.component';

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
  declarations: [SiderMenuComponent, PageHeaderComponent, PageHeaderMixedComponent],
  exports: [SiderMenuComponent, PageHeaderComponent, PageHeaderMixedComponent]
})
export class BitRouterModule {
  static forRoot(): ModuleWithProviders<BitRouterModule> {
    return {
      ngModule: BitRouterModule,
      providers: [BitRouterService]
    };
  }
}
