import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-security-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
  tips = {
    login_failures: {
      default: {
        required: $localize`The times cannot be empty`
      }
    },
    login_ttl: {
      default: {
        required: $localize`The TTL cannot by empty`
      }
    }
  };
  @Input() values!: Record<string, any>;
  formatterTimes = (value: number): string => $localize`${value} times`;
  formatterSec = (value: number): string => $localize`${value} s`;
  form!: FormGroup;

  constructor(
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
      this.message.success($localize`Data update complete`);
      this.modalRef.triggerOk();
    });
  }
}
