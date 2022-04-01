import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-settings',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="应用">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['application', 'roles']">
                  <i nz-icon nzType="partition"></i> <span>权限管理</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['application', 'users']">
                  <i nz-icon nzType="team"></i> <span>成员管理</span>
                </li>
              </ul>
            </li>
            <li nz-menu-group nzTitle="安全性">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'session']">
                  <i nz-icon nzType="rocket"></i> <span>活动会话</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'policy']">
                  <i nz-icon nzType="security-scan"></i> <span>登录策略</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'whitelist']">
                  <i nz-icon nzType="safety-certificate"></i> <span>IP 白名单</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'audit']">
                  <i nz-icon nzType="file-protect"></i> <span>审计日志</span>
                </li>
              </ul>
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
export class SettingsComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.pageId = undefined;
  }
}
