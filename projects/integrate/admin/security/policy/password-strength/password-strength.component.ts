import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-password-strength',
  templateUrl: './password-strength.component.html',
  styles: [
    `
      [nz-radio] {
        margin-left: 1em;
        display: block;
        height: 32px;
        line-height: 32px;
      }
    `
  ]
})
export class PasswordStrengthComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      strength: [1, [Validators.required]]
    });
    this.form.patchValue({
      strength: parseInt(this.data['password_strength'])
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    this.wpx.setVar('password_strength', value.strength).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
