import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { WpxStoreService } from '@weplanx/ng/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CosComponent } from './cos/cos.component';
import { TencentComponent } from './tencent/tencent.component';

@Component({
  selector: 'app-admin-cloud',
  templateUrl: './cloud.component.html'
})
export class CloudComponent implements OnInit {
  tabIndex = 0;
  values: Record<string, any> = {};

  constructor(
    private wpx: WpxService,
    private store: WpxStoreService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  saveTabIndex(): void {
    this.store.set<number>('admin-cloud-tab', this.tabIndex).subscribe(() => {});
  }

  getData(): void {
    this.store.get<number>('admin-cloud-tab').subscribe(v => {
      if (v) {
        this.tabIndex = v;
      }
    });
    this.wpx
      .getValues([
        'cloud',
        'tencent_secret_id',
        'tencent_secret_key',
        'tencent_cos_bucket',
        'tencent_cos_region',
        'tencent_cos_expired',
        'tencent_cos_limit'
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

  useCloud(cloud: string): void {
    let message = $localize`您确定使用这个服务商吗？`;
    if (this.values['cloud']) {
      if (cloud === this.values['cloud']) {
        message = $localize`您确定要停用他吗?`;
        cloud = '';
      } else {
        message = $localize`已经存在一个服务商，开启他将关闭之前存在的！`;
      }
    }
    this.modal.confirm({
      nzTitle: $localize`公有云设置`,
      nzContent: message,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.wpx
          .setValues({
            cloud
          })
          .subscribe(() => {
            this.getData();
            this.message.success($localize`数据更新成功`);
          });
      }
    });
  }

  setTencent(): void {
    this.setModal($localize`腾讯云设置`, TencentComponent);
  }

  setCos(): void {
    this.setModal($localize`腾讯云 COS 设置`, CosComponent);
  }
}
