import { Component } from '@angular/core';

@Component({
  selector: 'app-exception-403',
  template: `
    <bit-ph skip></bit-ph>
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="抱歉，您没有访问该页面的权限">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/"> 回到主页 </button>
      </div>
    </nz-result>
  `
})
export class ForbiddenComponent {}
