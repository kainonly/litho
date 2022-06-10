import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() data!: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 次数
   * @param value
   */
  formatterTimes = (value: number): string => `${value} 次`;
  /**
   * 秒
   * @param value
   */
  formatterSec = (value: number): string => `${value} 秒`;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user_login_failed_times: [0, [Validators.required]],
      user_lock_time: [0, [Validators.required]]
    });
    this.form.patchValue({
      user_login_failed_times: this.data['user_login_failed_times'],
      user_lock_time: this.data['user_lock_time'] / 1000000000
    });
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    data['user_lock_time'] = data['user_lock_time'] * 1000000000;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
