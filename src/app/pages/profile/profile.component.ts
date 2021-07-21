import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@vanx/framework';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { BitService } from 'ngx-bit';

import * as packer from './language';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  editPassword = false;
  avatar = '';

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private mainService: AppService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      call: [null],
      email: [null, [Validators.email]],
      phone: [null]
    });
    this.getInformation();
  }

  validedPassword = (control: AbstractControl): any => {
    if (!this.editPassword) {
      return;
    }
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return { required: true };
    }
    const value = control.value;
    const len = value.length;
    if (len < 12) {
      return { min: true, error: true };
    }
    if (len > 20) {
      return { max: true, error: true };
    }
    if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
      return { lowercase: true, error: true };
    }
    if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
      return { uppercase: true, error: true };
    }
    if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
      return { number: true, error: true };
    }
    if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
      return { symbol: true, error: true };
    }
    return null;
  };

  validedNewPassword = (control: AbstractControl): any => {
    if (!this.editPassword) {
      return;
    }
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return { required: true };
    }
    control.parent!.get('new_password_check')!.updateValueAndValidity();
    const value = control.value;
    const len = value.length;
    if (len < 12) {
      return { min: true, error: true };
    }
    if (len > 20) {
      return { max: true, error: true };
    }
    if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
      return { lowercase: true, error: true };
    }
    if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
      return { uppercase: true, error: true };
    }
    if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
      return { number: true, error: true };
    }
    if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
      return { symbol: true, error: true };
    }
    return null;
  };

  checkNewPassword = (control: AbstractControl): any => {
    if (!this.editPassword) {
      return;
    }
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return { required: true };
    }
    const password = control.parent!.get('new_password')!.value;
    if (control.value !== password) {
      return { correctly: true, error: true };
    }
    return null;
  };

  /**
   * 获取个人信息
   */
  getInformation(): void {
    this.mainService.information().subscribe(data => {
      this.avatar = data.avatar;
      this.form.patchValue({
        call: data.call,
        email: data.email,
        phone: data.phone
      });
    });
  }

  /**
   * 头像上传
   */
  upload(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      this.avatar = Reflect.get(info.file.originFileObj!, 'key');
      this.notification.success(this.bit.l.success, this.bit.l.uploadSuccess);
    }
    if (info.type === 'error') {
      this.notification.error(this.bit.l.notice, this.bit.l.uploadError);
    }
  }

  /**
   * 监听密码修改关闭
   */
  editPasswordChange(status: boolean): void {
    if (status) {
      this.form.addControl('old_password', new FormControl(null, [this.validedPassword]));
      this.form.addControl('new_password', new FormControl(null, [this.validedNewPassword]));
      this.form.addControl('new_password_check', new FormControl(null, [this.checkNewPassword]));
    } else {
      this.form.removeControl('old_password');
      this.form.removeControl('new_password');
      this.form.removeControl('new_password_check');
    }
  }

  submit = (data: any): void => {
    if (this.avatar) {
      data.avatar = this.avatar;
    }
    delete data.new_password_check;
    if (!this.editPassword) {
      delete data.old_password;
      delete data.new_password;
    }
    this.mainService.update(data).subscribe(res => {
      switch (res.error) {
        case 0:
          this.notification.success(this.bit.l.success, this.bit.l.updateSuccess);
          this.form.reset();
          this.editPassword = false;
          this.getInformation();
          break;
        case 1:
          this.notification.error(this.bit.l.error, this.bit.l.updateError);
          break;
        case 2:
          this.notification.error(this.bit.l.error, this.bit.l.passwordError);
          break;
      }
    });
  };
}
