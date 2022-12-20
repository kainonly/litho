import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User } from '@common/types';
import { UsersService } from '@common/users.service';
import { AnyDto, validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-users-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<User>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 密码可视
   */
  passwordVisible = false;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email], [this.checkEmail]],
      password: [null, [Validators.required, Validators.min(6)]],
      name: [null],
      avatar: [null],
      status: [true, [Validators.required]]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  /**
   * 检测电子邮件是否存在
   * @param control
   */
  checkEmail = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.email) {
      return of(null);
    }
    return this.users.create(control.value);
  };

  /**
   * 验证密码安全性
   * @param control
   */
  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return !this.doc ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
  submit(value: any): void {
    if (!this.doc) {
      this.users
        .create(value, {
          xdata: { password: 'password' }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      if (!value.password) {
        delete value.password;
      }
      this.users
        .updateById(
          this.doc._id,
          {
            $set: value
          },
          {
            xdata: { password: 'password' }
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
