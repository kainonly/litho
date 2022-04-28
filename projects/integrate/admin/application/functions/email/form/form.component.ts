import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-email-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
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
      email_host: [null, [Validators.required]],
      email_port: [null, [Validators.required]],
      email_username: [null, [Validators.required]],
      email_password: [null, [Validators.required]]
    });
    this.form.patchValue({
      email_host: this.data['email_host'],
      email_port: this.data['email_port'],
      email_username: this.data['email_username']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('email_host', value.email_host),
      this.wpx.setVar('email_port', value.email_port),
      this.wpx.setVar('email_username', value.email_username),
      this.wpx.setVar('email_password', value.email_password)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
