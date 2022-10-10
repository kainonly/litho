import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <app-header>
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/security', 'policy']">
              <span nz-icon nzType="safety-certificate"></span>
              策略
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/security', 'sessions']">
              <span nz-icon nzType="rocket"></span>
              会话
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/security', 'audit']">
              <span nz-icon nzType="file-protect"></span>
              审计
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
export class SecurityComponent {}
