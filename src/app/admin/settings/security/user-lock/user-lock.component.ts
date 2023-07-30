import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-security-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
  form!: FormGroup;
  tips = {
    LoginFailures: {
      default: {
        required: $localize`连续登录失败上限不能为空`
      }
    },
    LoginTTL: {
      default: {
        required: $localize`锁定时间不能为空`
      }
    }
  };
  formatterTimes = (value: number): string => $localize`${value} 次`;
  formatterSec = (value: number): string => `${value} s`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public values: R,
    private app: AppService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      LoginFailures: [0, [Validators.required]],
      LoginTTL: [0, [Validators.required]]
    });
    const data = {
      LoginFailures: this.values['LoginFailures'],
      LoginTTL: this.values['LoginTTL'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data['LoginTTL'] = data['LoginTTL'] * 1e9;
    this.app.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
