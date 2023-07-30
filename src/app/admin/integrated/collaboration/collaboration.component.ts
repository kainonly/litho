import { Component, OnInit, Type } from '@angular/core';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LarkComponent } from './lark/lark.component';
import { RedirectComponent } from './redirect/redirect.component';

@Component({
  selector: 'app-admin-integrated-collaboration',
  templateUrl: './collaboration.component.html'
})
export class CollaborationComponent implements OnInit {
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
      .getValues(['LarkAppId', 'LarkAppSecret', 'LarkEncryptKey', 'LarkVerificationToken', 'RedirectUrl'])
      .subscribe(data => {
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

  setLark(): void {
    this.setModal($localize`设置`, LarkComponent);
  }

  setLoginFree(): void {
    this.setModal($localize`第三方免登陆设置`, RedirectComponent);
  }
}
