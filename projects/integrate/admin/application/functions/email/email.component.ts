import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BasicComponent } from './basic/basic.component';

@Component({
  selector: 'wpx-admin-functions-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  /**
   * 数据
   */
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.wpx.getValues(['email_host', 'email_port', 'email_username', 'email_password']).subscribe(data => {
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
   * 基础设置
   */
  setBasic(): void {
    this.setModal(BasicComponent);
  }
}
