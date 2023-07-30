import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-extend-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  form!: FormGroup;
  tips = {
    EmailUsername: {
      default: {
        required: $localize`用户名不能为空`
      }
    },
    EmailPassword: {
      default: {
        required: $localize`密码不能为空`
      }
    }
  };

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
      EmailHost: [null, [Validators.required]],
      EmailPort: [null, [Validators.required]],
      EmailUsername: [null, [Validators.required]],
      EmailPassword: [null, [Validators.required]]
    });
    this.form.patchValue({
      EmailHost: this.values['EmailHost'],
      EmailPort: this.values['EmailPort'],
      EmailUsername: this.values['EmailUsername']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
