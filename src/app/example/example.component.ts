import { Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-example',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>

      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-item nzMatchRouter [routerLink]="['media']">
              <i nz-icon nzType="experiment"></i> <span>媒体表单</span>
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['orders']">
              <i nz-icon nzType="experiment"></i> <span>动态表格</span>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <wpx-page-header [wpxManual]="true"></wpx-page-header>
          <nz-content [ngClass]="{ content: !wpx.layout.noPadding }">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class ExampleComponent {
  constructor(public wpx: WpxService) {}
}
