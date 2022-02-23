import { Component } from '@angular/core';

@Component({
  selector: 'wpx-center',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="个人设置">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'info']">
                  <i nz-icon nzType="solution"></i> <span>基本信息</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'safety']">
                  <i nz-icon nzType="safety"></i> <span>安全设置</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'linked']">
                  <i nz-icon nzType="link"></i> <span>帐号绑定</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'notify']">
                  <i nz-icon nzType="notification"></i> <span>通知设置</span>
                </li>
              </ul>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <wpx-page-header [wpxManual]="true"> </wpx-page-header>
          <nz-content class="content">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class CenterComponent {}
