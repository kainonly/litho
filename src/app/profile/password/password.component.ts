import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { validates } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  tips = {
    password: {
      default: {
        required: $localize`The new password cannot be empty`,
        minlength: $localize`The length of the new password cannot be less than 12 characters`,
        lowercase: $localize`The new password needs to contain lowercase letters`,
        uppercase: $localize`The new password needs to contain capital letters`,
        number: $localize`The new password needs to contain numbers`,
        symbol: $localize`The new password needs to contain symbols (@$!%*?&-+)`
      }
    }
  };
  form!: FormGroup;
  passwordVisible = false;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required, this.validedPassword]]
    });
  }

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'password',
        password: data.password
      })
      .subscribe(() => {
        this.message.success($localize`Data update complete`);
        this.modalRef.triggerOk();
      });
  }
}
