import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
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
        required: $localize`会话超时不能为空`
      }
    }
  };
  formatterSec = (value: number): string => $localize`${value} s`;

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
      SessionTTL: [0, [Validators.required]]
    });
    const data = {
      SessionTTL: this.values['SessionTTL'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data['SessionTTL'] = data['SessionTTL'] * 1e9;
    this.app.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
