import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CosComponent } from './cos/cos.component';
import { PlatformComponent } from './platform/platform.component';

@Component({
  selector: 'wpx-admin-functions-cloud',
  templateUrl: './cloud.component.html'
})
export class CloudComponent implements OnInit {
  /**
   * 数据
   */
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
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
        this.data = data;
      });
  }

  /**
   * 设置对话框
   * @param component
   * @private
   */
  private setModal(component: Type<{ data: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 设置平台
   */
  setPlatform(): void {
    this.setModal(PlatformComponent);
  }

  /**
   * 设置对象存储
   */
  setCos(): void {
    this.setModal(CosComponent);
  }

  /**
   * 取消关联
   */
  unset(): void {
    this.wpx.setValues({ cloud: '' }).subscribe(() => {
      this.message.success('关联已取消');
      this.getData();
    });
  }
}
