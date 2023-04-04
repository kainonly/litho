import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-system-security-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    login_failures: {
      default: {
        required: $localize`连续登录失败上限不能为空`
      }
    },
    login_ttl: {
      default: {
        required: $localize`锁定时间不能为空`
      }
    }
  };
  formatterTimes = (value: number): string => $localize`${value} 次`;
  formatterSec = (value: number): string => `${value} s`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public values: Record<string, any>,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      login_failures: [0, [Validators.required]],
      login_ttl: [0, [Validators.required]]
    });
    const data = {
      login_failures: this.values['login_failures'],
      login_ttl: this.values['login_ttl'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    data['login_ttl'] = data['login_ttl'] * 1e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
