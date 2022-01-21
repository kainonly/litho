import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-resources',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <ul nz-menu nzMode="inline">
            <li nz-menu-group nzTitle="媒体资源">
              <ul>
                <li nz-menu-item nzMatchRouter [routerLink]="['pictures']"> <span>图库</span> </li>
                <li nz-menu-item nzMatchRouter [routerLink]="['videos']"> <span>视频</span> </li>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent {
  constructor(public wpx: WpxService) {}
}
