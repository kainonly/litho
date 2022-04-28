import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-functions-openapi',
  templateUrl: './openapi.component.html'
})
export class OpenapiComponent implements OnInit {
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx.getVars('openapi_url', 'openapi_key', 'openapi_secret').subscribe(v => {
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
