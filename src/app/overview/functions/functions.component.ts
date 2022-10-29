import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';

@Component({
  selector: 'app-overview-functions',
  templateUrl: './functions.component.html'
})
export class FunctionsComponent implements OnInit {
  /**
   * 数据
   */
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.wpx
      .getValues([
        'email_host',
        'email_port',
        'email_username',
        'email_password',
        'openapi_url',
        'openapi_key',
        'openapi_secret'
      ])
      .subscribe(data => {
        this.data = data;
      });
  }

  /**
   * 设置对话框
   * @param component
   * @private
   */
  private setModal(component: Type<{ data: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 设置电子邮件
   */
  setEmail(): void {
    this.setModal(EmailComponent);
  }

  /**
   * 基本设置
   */
  setOpenapi(): void {
    this.setModal(OpenapiComponent);
  }
}
