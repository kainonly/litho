import { Component, OnInit, Type } from '@angular/core';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';

@Component({
  selector: 'app-admin-integrated-extend',
  templateUrl: './extend.component.html'
})
export class ExtendComponent implements OnInit {
  data: R = {};

  constructor(
    private wpx: WpxService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getValues([
        'EmailHost',
        'EmailPort',
        'EmailUsername',
        'EmailPassword',
        'OpenapiUrl',
        'OpenapiKey',
        'OpenapiSecret'
      ])
      .subscribe(data => {
        this.data = data;
      });
  }

  private setModal(nzTitle: string, component: Type<Any>): void {
    this.modal.create<Type<Any>, Record<string, Any>>({
      nzTitle,
      nzContent: component,
      nzData: this.data,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  setEmail(): void {
    this.setModal(`公共邮箱设置`, EmailComponent);
  }
}
