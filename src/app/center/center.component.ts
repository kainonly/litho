import { Component } from '@angular/core';

@Component({
  selector: 'app-center',
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
            <li nz-menu-item nzMatchRouter [routerLink]="['/center', 'work']">
              <span nz-icon nzType="desktop"></span>
              工作台
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/center', 'safety']">
              <span nz-icon nzType="safety"></span>
              安全设置
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/center', 'third-party']">
              <span nz-icon nzType="link"></span>
              第三方关联
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
export class CenterComponent {}
