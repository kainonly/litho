import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-cloud-cos',
  templateUrl: './cos.component.html'
})
export class CosComponent implements OnInit {
  tips = {
    tencent_cos_bucket: {
      default: {
        required: $localize`The bucket name cannot be empty`
      }
    },
    tencent_cos_region: {
      default: {
        required: $localize`the region cannot be empty`
      }
    },
    tencent_cos_expired: {
      default: {
        required: $localize`the pre-signature ttl cannot be empty`
      }
    },
    tencent_cos_limit: {
      default: {
        required: $localize`the upload size limit cannot be empty`
      }
    }
  };

  @Input() values!: Record<string, any>;
  formatterSec = (value: number): string => `${value} s`;
  formatterSize = (value: number): string => `${value} KB`;
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tencent_cos_bucket: [null, [Validators.required]],
      tencent_cos_region: [null, [Validators.required]],
      tencent_cos_expired: [null, [Validators.required]],
      tencent_cos_limit: [null, [Validators.required]]
    });
    const values = { ...this.values };
    this.form.patchValue(values);
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
