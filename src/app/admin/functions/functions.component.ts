import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CloudComponent } from './cloud/cloud.component';
import { CosComponent } from './cos/cos.component';
import { EmailComponent } from './email/email.component';
import { OfficeComponent } from './office/office.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { RedirectComponent } from './redirect/redirect.component';

@Component({
  selector: 'app-admin-functions',
  templateUrl: './functions.component.html'
})
export class FunctionsComponent implements OnInit {
  /**
   * 数据
   */
  values: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.wpx
      .getValues([
        'cloud',
        'tencent_secret_id',
        'tencent_secret_key',
        'tencent_cos_bucket',
        'tencent_cos_region',
        'tencent_cos_expired',
        'tencent_cos_limit',
        'office',
        'feishu_app_id',
        'feishu_app_secret',
        'feishu_encrypt_key',
        'feishu_verification_token',
        'redirect_url',
        'email_host',
        'email_port',
        'email_username',
        'email_password',
        'openapi_url',
        'openapi_key',
        'openapi_secret'
      ])
      .subscribe(data => {
        this.values = data;
      });
  }

  /**
   * 设置对话框
   * @param component
   * @private
   */
  private setModal(component: Type<{ values: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        values: this.values
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 设置云平台
   */
  setCloud(): void {
    this.setModal(CloudComponent);
  }

  /**
   * 取消云平台
   */
  unsetCloud(): void {
    this.wpx.setValues({ cloud: '' }).subscribe(() => {
      this.message.success('关联已取消');
      this.getData();
    });
  }

  /**
   * 设置对象存储
   */
  setCos(): void {
    this.setModal(CosComponent);
  }

  /**
   * 设置平台
   */
  setOffice(): void {
    this.setModal(OfficeComponent);
  }

  /**
   * 取消关联
   */
  unsetOffice(): void {
    this.wpx.setValues({ office: '' }).subscribe(() => {
      this.message.success('关联已取消');
      this.getData();
    });
  }

  /**
   * 设置跳转地址
   */
  setRedirect(): void {
    this.setModal(RedirectComponent);
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
