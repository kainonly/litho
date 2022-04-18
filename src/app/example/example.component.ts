import { Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-example',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>

      <nz-layout class="wpx-container">
        <nz-sider class="wpx-sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-item nzMatchRouter [routerLink]="['form']">
              <i nz-icon nzType="experiment"></i> <span>静态表单</span>
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['pages-form']">
              <i nz-icon nzType="experiment"></i> <span>动态表单</span>
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['pages-table']">
              <i nz-icon nzType="experiment"></i> <span>动态表格</span>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <nz-content class="content">
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
