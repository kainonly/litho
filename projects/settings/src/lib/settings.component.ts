import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-settings',
  template: `
    <nz-layout class="main">
      <wpx-header [wpxLogout]="app.logout"></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="应用">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['application', 'pages']">
                  <i nz-icon nzType="file-sync"></i> <span>页面管理</span>
                </li>
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
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'policy']">
                  <i nz-icon nzType="verified"></i> <span>登录策略</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'access']">
                  <i nz-icon nzType="insurance"></i> <span>访问控制</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'audit']">
                  <i nz-icon nzType="file-protect"></i> <span>审计工单</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['security', 'logs']">
                  <i nz-icon nzType="file-search"></i> <span>日志检索</span>
                </li>
              </ul>
            </li>
            <li nz-menu-group nzTitle="开发者">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['developer', 'config']">
                  <i nz-icon nzType="control"></i> <span>配置列表</span>
                </li>
                <li nz-menu-item> <i nz-icon nzType="build"></i> <span>版本管理</span> </li>
                <li nz-menu-item> <i nz-icon nzType="schedule"></i> <span>定时调度</span> </li>
                <li nz-menu-item> <i nz-icon nzType="one-to-one"></i> <span>消息队列</span> </li>
                <li nz-menu-item> <i nz-icon nzType="monitor"></i> <span>服务状态</span> </li>
              </ul>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <wpx-page-header [wpxManual]="true"></wpx-page-header>
          <nz-content [class.content]="!noPadding">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class SettingsComponent implements OnInit {
  noPadding = false;

  constructor(public app: AppService, public wpx: WpxService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.wpx.layout.subscribe(option => {
      this.noPadding = option.noPadding ?? false;
      this.cd.detectChanges();
    });
  }
}
