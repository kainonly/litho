import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-functions-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx.getVars('email_host', 'email_port', 'email_username', 'email_password').subscribe(v => {
      this.data = v;
    });
  }

  form(): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: FormComponent,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
