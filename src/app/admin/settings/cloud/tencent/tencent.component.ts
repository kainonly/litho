import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-cloud-tencent',
  templateUrl: './tencent.component.html'
})
export class TencentComponent implements OnInit {
  tips = {
    tencent_secret_id: {
      default: {
        required: $localize`The SecretId cannot be empty`
      }
    },
    tencent_secret_key: {
      default: {
        required: $localize`The SecretKey cannot be empty`
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
      tencent_secret_id: [null, [Validators.required]],
      tencent_secret_key: [null, [Validators.required]]
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
