import { Component } from '@angular/core';

@Component({
  selector: 'app-index-not-found',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="抱歉，相关项目不存在或已被删除">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/admin/projects">访问项目管理</button>
      </div>
    </nz-result>
  `
})
export class NotFoundComponent {}
