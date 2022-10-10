import { Component } from '@angular/core';

@Component({
  selector: 'app-functions',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <app-header>
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/functions', 'cloud']">
              <span nz-icon nzType="cloud"></span>
              云平台
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/functions', 'office']">
              <span nz-icon nzType="coffee"></span>
              企业办公
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/functions', 'email']">
              <span nz-icon nzType="mail"></span>
              电子邮件
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/functions', 'openapi']">
              <span nz-icon nzType="gateway"></span>
              开放服务
            </li>
          </ul>
        </app-header>
        <nz-layout class="frame">
          <nz-layout style="overflow: auto">
            <nz-content>
              <router-outlet></router-outlet>
            </nz-content>
          </nz-layout>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class FunctionsComponent {}
