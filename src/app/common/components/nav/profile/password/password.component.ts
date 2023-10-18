import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, validates } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nav-profile-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  form!: FormGroup;
  tips = {
    password: {
      default: {
        required: `密码不能为空`,
        minlength: `密码不能小于 8 位`,
        lowercase: `密码需要包含小写字母`,
        uppercase: `密码需要包含大写字母`,
        number: `密码需要包含数字`,
        symbol: `密码需要包含符号 (@$!%*?&-+)`
      }
    }
  };
  oldVisible = false;
  passwordVisible = false;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      old: [null, [Validators.required, this.validedPassword]],
      password: [null, [Validators.required, this.validedPassword]]
    });
  }

  validedPassword = (control: AbstractControl): Any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUserPassword(data.old, data.password).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
