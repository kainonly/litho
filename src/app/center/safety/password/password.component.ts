import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { validates, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-center-safety-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  form!: UntypedFormGroup;
  passwordVisible = false;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private fb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [this.validedPassword]]
    });
    this.wpx.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  validedPassword = (control: AbstractControl): any => {
    if (!control.value) {
      return;
    }
    return validates.password(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setUser('password', data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}
