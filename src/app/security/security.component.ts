import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-security',
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
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'security', 'policy']">
              <span nz-icon nzType="safety-certificate"></span>
              策略
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'security', 'sessions']">
              <span nz-icon nzType="rocket"></span>
              会话
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'security', 'audit']">
              <span nz-icon nzType="file-protect"></span>
              审计
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
export class SecurityComponent {
  constructor(public app: AppService) {}
}
