import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FeishuComponent } from './feishu/feishu.component';
import { RedirectComponent } from './redirect/redirect.component';

@Component({
  selector: 'app-admin-integrated-collaboration',
  templateUrl: './collaboration.component.html'
})
export class CollaborationComponent implements OnInit {
  values: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getValues([
        'feishu_app_id',
        'feishu_app_secret',
        'feishu_encrypt_key',
        'feishu_verification_token',
        'redirect_url'
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

  setFeishu(): void {
    this.setModal($localize`Feishu Form`, FeishuComponent);
  }

  setLoginFree(): void {
    this.setModal($localize`Login-free Authorization Form`, RedirectComponent);
  }
}
