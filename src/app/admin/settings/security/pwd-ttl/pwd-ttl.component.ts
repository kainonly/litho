import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-security-pwd-ttl',
  templateUrl: './pwd-ttl.component.html'
})
export class PwdTtlComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() values!: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 天
   * @param value
   */
  formatterTimes = (value: number): string => `${value} 天`;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pwd_ttl: [0, [Validators.required]]
    });
    const data = {
      pwd_ttl: this.values['pwd_ttl'] / 86400e9
    };
    this.form.patchValue(data);
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
    data.pwd_ttl = data.pwd_ttl * 86400e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
