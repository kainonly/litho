import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { User } from '@common/interfaces/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto, validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface DeveloperFormData {
  doc?: AnyDto<User>;
}

@Component({
  selector: 'app-admin-orgs-users-developer-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    email: {
      default: {
        required: $localize`电子邮件不能为空`,
        duplicated: $localize`存在重复的定义，电子邮件必须是唯一的`
      }
    },
    password: {
      default: {
        required: $localize`密码不能为空`,
        minlength: $localize`密码长度必须大于6位`
      }
    }
  };
  passwordVisible = false;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: DeveloperFormData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.checkEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
      avatar: [''],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.get('password')?.setValidators([Validators.minLength(6)]);
      this.form.patchValue(this.data.doc);
    }
  }

  checkEmail = (control: AbstractControl): Observable<any> => {
    if (control.value === this.data.doc?.email) {
      return of(null);
    }
    return this.users.existsEmail(control.value);
  };

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return !this.data.doc ? { required: true } : null;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      this.users
        .create(data, {
          xdata: { password: 'password' }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      if (!data.password) {
        delete data.password;
      }
      this.users
        .updateById(
          this.data.doc._id,
          {
            $set: data
          },
          {
            xdata: { password: 'password' }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
