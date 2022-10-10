import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <app-header>
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/developer', 'values']">
              <span nz-icon nzType="safety-certificate"></span>
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
export class DeveloperComponent {}
