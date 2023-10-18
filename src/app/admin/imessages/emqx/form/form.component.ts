import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-imessage-emqx-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    EmqxHost: {
      default: {
        required: `EMQX Host 不能为空`
      }
    },
    EmqxApiKey: {
      default: {
        required: `Emqx ApiKey 不能为空`
      }
    },
    EmqxSecretKey: {
      default: {
        required: `Emqx SecretKey 不能为空`
      }
    }
  };

  constructor(
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      EmqxHost: [null, [Validators.required]],
      EmqxApiKey: [null, [Validators.required]],
      EmqxSecretKey: [null, [Validators.required]]
    });
    this.wpx.getValues(['EmqxHost', 'EmqxApiKey']).subscribe(data => {
      this.form.patchValue({
        EmqxHost: data['EmqxHost'],
        EmqxApiKey: data['EmqxApiKey']
      });
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
