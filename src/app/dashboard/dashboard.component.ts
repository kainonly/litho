import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-dashboard',
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
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'dashboard', 'cloud']">
              <span nz-icon nzType="cloud"></span>
              云平台
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'dashboard', 'office']">
              <span nz-icon nzType="coffee"></span>
              企业办公
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'dashboard', 'email']">
              <span nz-icon nzType="mail"></span>
              电子邮件
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'dashboard', 'openapi']">
              <span nz-icon nzType="gateway"></span>
              开放服务
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
export class DashboardComponent {
  constructor(public app: AppService) {}
}
