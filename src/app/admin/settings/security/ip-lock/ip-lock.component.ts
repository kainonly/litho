import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-security-ip-lock',
  templateUrl: './ip-lock.component.html'
})
export class IpLockComponent implements OnInit {
  form!: FormGroup;
  tips = {
    ip_login_failures: {
      default: {
        required: `Number of times cannot be empty`
      }
    }
  };
  formatterTimes = (value: number): string => `${value} Times`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      IpLoginFailures: [0, [Validators.required]]
    });
    this.form.patchValue(this.data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success(`Update successful`);
      this.modalRef.triggerOk();
    });
  }
}
