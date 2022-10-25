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
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'dashboard', 'analysis']">
              <span nz-icon nzType="pie-chart"></span>
              分析
            </li>
            <li nz-menu-item nzDisabled>
              <span nz-icon nzType="line-chart"></span>
              实时
            </li>
            <li nz-menu-item nzDisabled>
              <span nz-icon nzType="rise"></span>
              转化
            </li>
          </ul>
        </app-header>
        <nz-layout class="frame">
          <nz-content style="padding: 8px">
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
