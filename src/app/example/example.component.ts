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
            <li nz-menu-item nzMatchRouter [routerLink]="['form']">
              <i nz-icon nzType="experiment"></i> <span>静态表单</span>
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['dynamic-form']">
              <i nz-icon nzType="experiment"></i> <span>动态表单</span>
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['table']">
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
