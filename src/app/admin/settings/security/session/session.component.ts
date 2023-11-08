import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-security-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit {
  form!: FormGroup;
  tips = {
    session_ttl: {
      default: {
        required: `Expired cannot be empty`
      }
    }
  };
  formatterSec = (value: number): string => `${value} s`;

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
      SessionTTL: [0, [Validators.required]]
    });
    const data = {
      SessionTTL: this.data['SessionTTL'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data['SessionTTL'] = data['SessionTTL'] * 1e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success(`Update successful`);
      this.modalRef.triggerOk();
    });
  }
}
