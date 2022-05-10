import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';

@Component({
  selector: 'wpx-admin-functions-public',
  templateUrl: './public.component.html'
})
export class PublicComponent implements OnInit {
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getVars(
        'cdn',
        'email_host',
        'email_port',
        'email_username',
        'email_password',
        'openapi_url',
        'openapi_key',
        'openapi_secret'
      )
      .subscribe(v => {
        this.data = v;
      });
  }

  email(): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: EmailComponent,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  openapi(): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: OpenapiComponent,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
