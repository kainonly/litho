import { Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-settings',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="应用设置">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['pages']">
                  <i nz-icon nzType="file-sync"></i> <span>页面管理</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['roles']">
                  <i nz-icon nzType="partition"></i> <span>权限管理</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['users']">
                  <i nz-icon nzType="team"></i> <span>成员管理</span>
                </li>
              </ul>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <wpx-page-header [wpxManual]="true"> </wpx-page-header>
          <nz-content [ngClass]="{ content: !wpx.layout.noPadding }">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class SettingsComponent {
  constructor(public wpx: WpxService) {}
}
