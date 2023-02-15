import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-functions-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() values!: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email_host: [null, [Validators.required]],
      email_port: [null, [Validators.required]],
      email_username: [null, [Validators.required]],
      email_password: [null, [Validators.required]]
    });
    this.form.patchValue({
      email_host: this.values['email_host'],
      email_port: this.values['email_port'],
      email_username: this.values['email_username']
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
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
