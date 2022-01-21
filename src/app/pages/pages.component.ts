import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-pages',
  template: `
    <nz-layout class="main">
      <wpx-header [wpxLogout]="app.logout"></wpx-header>
      <nz-layout class="container">
        <nz-sider class="sider" nzTheme="light" [nzWidth]="240">
          <wpx-nav></wpx-nav>
        </nz-sider>
        <nz-layout style="overflow: auto">
          <wpx-page-header></wpx-page-header>
          <nz-content [ngClass]="{ content: !wpx.layout.noPadding }">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class PagesComponent implements OnInit {
  constructor(public app: AppService, public wpx: WpxService) {}

  ngOnInit(): void {
    this.app.navs().subscribe(data => {
      this.wpx.setNavs(data);
    });
  }
}
