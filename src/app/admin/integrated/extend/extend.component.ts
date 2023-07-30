import { Component, OnInit, Type } from '@angular/core';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { OpenapiComponent } from './openapi/openapi.component';

@Component({
  selector: 'app-admin-integrated-extend',
  templateUrl: './extend.component.html'
})
export class ExtendComponent implements OnInit {
  values: R = {};

  constructor(
    private app: AppService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.app
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
        console.log(data);
        this.values = data;
      });
  }

  private setModal(nzTitle: string, component: Type<Any>): void {
    this.modal.create<Type<Any>, Record<string, Any>>({
      nzTitle,
      nzContent: component,
      nzData: this.values,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  setEmail(): void {
    this.setModal($localize`公共邮箱设置`, EmailComponent);
  }

  setOpenapi(): void {
    this.setModal($localize`开放服务设置`, OpenapiComponent);
  }
}
