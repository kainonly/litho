import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-settings',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <app-header>
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'settings', 'cloud']">
              <span nz-icon nzType="cloud"></span>
              云平台
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'settings', 'office']">
              <span nz-icon nzType="coffee"></span>
              企业办公
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'settings', 'email']">
              <span nz-icon nzType="mail"></span>
              电子邮件
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.project.namespace, 'settings', 'openapi']">
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
export class SettingsComponent {
  constructor(public app: AppService) {}
}
