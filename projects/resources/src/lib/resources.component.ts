import { Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-resources',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="媒体资源">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['media', 'pictures']"> <span>图库</span> </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['media', 'videos']"> <span>视频</span> </li>
              </ul>
            </li>
            <li nz-menu-group nzTitle="第三方服务">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['third-party', 'enterprise']">
                  <i nz-icon nzType="laptop"></i> <span>企业办公</span>
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
export class ResourcesComponent {
  constructor(public wpx: WpxService) {}
}
