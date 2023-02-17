import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-security-ip-lock',
  templateUrl: './ip-lock.component.html'
})
export class IpLockComponent implements OnInit {
  tips = {
    ip_login_failures: {
      default: {
        required: $localize`The times cannot be empty`
      }
    }
  };
  @Input() values!: Record<string, any>;
  formatterTimes = (value: number): string => $localize`${value} times`;
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ip_login_failures: [0, [Validators.required]]
    });
    this.form.patchValue(this.values);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`Data update complete`);
      this.modalRef.triggerOk();
    });
  }
}
