import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-password-expire',
  templateUrl: './password-expire.component.html'
})
export class PasswordExpireComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;
  formatterTimes = (value: number): string => `${value} 天`;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      day: [365, [Validators.required]]
    });
    this.form.patchValue({
      day: this.data['password_expire']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    this.wpx.setVar('password_expire', value.day).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
