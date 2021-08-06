import { Component } from '@angular/core';

@Component({
  selector: 'app-exception-404',
  template: `
    <bit-ph skip></bit-ph>
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="抱歉，您访问的页面不存在">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/"> 回到主页 </button>
      </div>
    </nz-result>
  `
})
export class NotFoundComponent {}
