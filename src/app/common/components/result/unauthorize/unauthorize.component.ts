import { Component } from '@angular/core';

@Component({
  selector: 'app-result-unauthorize',
  template: `
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="抱歉，您还没有绑定飞书账号，请联系管理员设置相关企业协作">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/login" i18n>返回登录页</button>
      </div>
    </nz-result>
  `
})
export class UnauthorizeComponent {}
