import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitRouterService } from 'ngx-bit/router';

import { PageHeaderComponent } from './page-header/page-header.component';
import { SiderMenuComponent } from './sider-menu/sider-menu.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

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
  declarations: [SiderMenuComponent, PageHeaderComponent],
  exports: [SiderMenuComponent, PageHeaderComponent],
  providers: [BitRouterService]
})
export class BitRouterModule {}
