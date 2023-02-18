import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';

@Component({
  selector: 'app-admin-extend',
  templateUrl: './extend.component.html'
})
export class ExtendComponent implements OnInit {
  values: Record<string, any> = {};

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
        this.values = data;
      });
  }

  private setModal(nzTitle: string, component: Type<{ values: Record<string, any> }>): void {
    this.modal.create({
      nzTitle,
      nzContent: component,
      nzComponentParams: {
        values: this.values
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  setEmail(): void {
    this.setModal($localize`Public Mailbox Basic Form`, EmailComponent);
  }

  setOpenapi(): void {
    this.setModal($localize`Openapi Service Basic Form`, OpenapiComponent);
  }
}
