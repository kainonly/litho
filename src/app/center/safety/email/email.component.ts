import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { UsersService } from '../../../orgs/users/users.service';

@Component({
  selector: 'app-center-safety-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private app: AppService,
    private users: UsersService,
    private modalRef: NzModalRef,
    private fb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email], [this.checkEmail]]
    });
    this.app.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  checkEmail = (control: AbstractControl): Observable<any> => {
    if (control.value === this.app?.user?.email) {
      return of(null);
    }
    return this.users.checkEmail(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app.setUser(data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}
