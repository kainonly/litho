import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-overview-security-ip-lock',
  templateUrl: './ip-lock.component.html'
})
export class IpLockComponent implements OnInit {
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

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ip_login_failures: [0, [Validators.required]]
    });
    this.form.patchValue(this.data);
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
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
