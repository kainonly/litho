import { Component, OnInit, Type } from '@angular/core';

import { Any, R, WpxService, WpxStoreService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import { SmsTplComponent, SmsTplInput } from './sms-tpl/sms-tpl.component';

@Component({
  selector: 'app-admin-integrated-extend',
  templateUrl: './extend.component.html'
})
export class ExtendComponent implements OnInit {
  tabIndex = 0;
  values: R = {};
  smsTpls = [
    { key: 'SmsPhoneBind', name: '手机号关联' },
    { key: 'SmsLoginVerify', name: '登录验证' }
  ];

  constructor(
    private wpx: WpxService,
    private store: WpxStoreService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.store.get<number>('admin-extend-tab').subscribe(v => {
      if (v) {
        this.tabIndex = v;
      }
    });
    this.getData();
  }

  saveTabIndex(): void {
    this.store.set<number>('admin-extend-tab', this.tabIndex).subscribe(() => {});
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
        'OpenapiSecret',
        'SmsSecretId',
        'SmsSecretKey',
        'SmsSign',
        'SmsAppId',
        'SmsRegion',
        ...this.smsTpls.map(v => v.key)
      ])
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

  setEmail(): void {
    this.setModal(`公共邮箱设置`, EmailComponent);
  }

  setSms(): void {
    this.setModal(`腾讯 SMS 设置`, SmsComponent);
  }

  setSmsTpl(key: string): void {
    this.modal.create<SmsTplComponent, SmsTplInput>({
      nzTitle: `模板设置【${key}】`,
      nzContent: SmsTplComponent,
      nzData: {
        key,
        value: this.values[key]
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
