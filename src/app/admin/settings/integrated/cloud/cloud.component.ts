import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CosComponent } from './cos/cos.component';
import { TencentComponent } from './tencent/tencent.component';

@Component({
  selector: 'app-admin-integrated-cloud',
  templateUrl: './cloud.component.html'
})
export class CloudComponent implements OnInit {
  values: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
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
    let message = $localize`Are you sure to use this public cloud?`;
    if (this.values['cloud']) {
      if (cloud === this.values['cloud']) {
        message = $localize`Are you sure stop it?`;
        cloud = '';
      } else {
        message = $localize`A public cloud already exists, enabling it will automatically stop the previous!`;
      }
    }
    this.modal.confirm({
      nzTitle: $localize`Public Cloud Switch`,
      nzContent: message,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.wpx
          .setValues({
            cloud
          })
          .subscribe(() => {
            this.getData();
            this.message.success($localize`Data update complete`);
          });
      }
    });
  }

  setTencent(): void {
    this.setModal($localize`Tencent Cloud Form`, TencentComponent);
  }

  setCos(): void {
    this.setModal($localize`Tencent Cloud Cos Form`, CosComponent);
  }
}
