import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-session-expire',
  templateUrl: './session-expire.component.html'
})
export class SessionExpireComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      number: [1, [Validators.required]],
      unit: ['h', [Validators.required]]
    });
    const value = this.data['user_session_expire'];
    const l = value.length;
    this.form.patchValue({
      number: value.slice(0, l - 1),
      unit: value[l - 1]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    this.wpx.setVar('user_session_expire', `${value.number}${value.unit}`).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
