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
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'email']">
                  <i nz-icon nzType="mail"></i> <span>业务邮箱</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['profile', 'password']">
                  <i nz-icon nzType="verified"></i> <span>密码设置</span>
                </li>
              </ul>
            </li>
            <li nz-menu-group nzTitle="消息中心">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['message', 'notification']">
                  <i nz-icon nzType="notification"></i> <span>消息列表</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['message', 'prompt']">
                  <i nz-icon nzType="bell"></i> <span>通知提示</span>
                </li>
              </ul>
            </li>
            <li nz-menu-group nzTitle="其他设置">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['other', 'audit']">
                  <i nz-icon nzType="insurance"></i> <span>审计日志</span>
                </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['other', 'third-party']">
                  <i nz-icon nzType="link"></i> <span>第三方绑定</span>
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
