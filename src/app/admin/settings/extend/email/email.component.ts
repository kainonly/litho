import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-extend-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  tips = {
    email_host: {
      default: {
        required: $localize`The SMTP host cannot be empty`
      }
    },
    email_port: {
      default: {
        required: $localize`The SMTP port cannot be empty`
      }
    },
    email_username: {
      default: {
        required: $localize`The email username cannot be empty`
      }
    },
    email_password: {
      default: {
        required: $localize`The email password cannot be empty`
      }
    }
  };
  @Input() values!: Record<string, any>;
  form!: FormGroup;

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
      email_host: this.values['email_host'],
      email_port: this.values['email_port'],
      email_username: this.values['email_username']
    });
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
