import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-media',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <ng-template #breadcrumbTpl>
          <nz-breadcrumb nzAutoGenerate>
            <nz-breadcrumb-item>
              <a [routerLink]="['/']"><span nz-icon nzType="home"></span> 首页</a>
            </nz-breadcrumb-item>
          </nz-breadcrumb>
        </ng-template>
        <app-header [breadcrumb]="breadcrumbTpl">
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'media', 'pictures']">
              <span nz-icon nzType="picture"></span>
              图库
            </li>
            <li nz-menu-item nzDisabled>
              <span nz-icon nzType="sound"></span>
              音频
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'media', 'videos']">
              <span nz-icon nzType="video-camera"></span>
              视频
            </li>
            <li nz-menu-item nzDisabled>
              <span nz-icon nzType="file-word"></span>
              文档
            </li>
          </ul>
        </app-header>
        <nz-layout class="frame">
          <nz-content>
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class MediaComponent {
  constructor(public app: AppService) {}
}
