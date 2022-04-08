import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-pages',
  template: `
    <nz-layout class="main">
      <wpx-header></wpx-header>

      <nz-layout class="wpx-container">
        <nz-sider class="wpx-sider" nzTheme="light">
          <wpx-nav></wpx-nav>
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
export class PagesComponent implements OnInit {
  constructor(public app: AppService, public wpx: WpxService) {}

  ngOnInit(): void {
    this.app.navs().subscribe(data => {
      this.wpx.setPages(data);
    });
  }
}
