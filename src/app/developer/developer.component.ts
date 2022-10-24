import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
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
            <li nz-menu-item nzMatchRouter [routerLink]="['/developer', 'values']">
              <span nz-icon nzType="global"></span>
              动态配置
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/developer', 'schedules']">
              <span nz-icon nzType="rocket"></span>
              定时调度
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/developer', 'collector']">
              <span nz-icon nzType="file-protect"></span>
              日志采集
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
export class DeveloperComponent {}
