import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

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

  constructor(public wpx: WpxService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.wpx.layout.subscribe(option => {
      this.noPadding = option.noPadding ?? false;
      this.cd.detectChanges();
    });
  }
}
