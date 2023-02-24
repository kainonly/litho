import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { UsersService } from '@common/services/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  tips = {
    email: {
      default: {
        email: $localize`电子邮件格式不规范`,
        duplicated: $localize`存在重复的定义，电子邮件必须是唯一的`
      }
    }
  };
  form!: FormGroup;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private users: UsersService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email], [this.existsEmail]]
    });
    this.form.patchValue(this.app.user!);
  }

  existsEmail = (control: AbstractControl): Observable<any> => {
    if (control.value === this.app.user!.email) {
      return of(null);
    }
    return this.users.existsEmail(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'email',
        email: data.email
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功，需要重新登录系统`);
        this.modalRef.triggerOk();
      });
  }
}
