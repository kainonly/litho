import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-system-security-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit {
  tips = {
    session_ttl: {
      default: {
        required: $localize`会话超时不能为空`
      }
    }
  };
  @Input() values!: Record<string, any>;
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
      session_ttl: [0, [Validators.required]]
    });
    const data = {
      session_ttl: this.values['session_ttl'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    data['session_ttl'] = data['session_ttl'] * 1e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
