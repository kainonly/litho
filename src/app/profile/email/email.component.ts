import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { UsersService } from '@common/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
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
        this.message.success('数据更新完成，您需要重新登录系统');
        this.modalRef.triggerOk();
      });
  }
}
