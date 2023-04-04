import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-integrated-cloud-cos',
  templateUrl: './cos.component.html'
})
export class CosComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    tencent_cos_bucket: {
      default: {
        required: $localize`Bucket 名称不能为空`
      }
    },
    tencent_cos_region: {
      default: {
        required: $localize`地区不能为空`
      }
    },
    tencent_cos_expired: {
      default: {
        required: $localize`预签名有效期不能为空`
      }
    },
    tencent_cos_limit: {
      default: {
        required: $localize`上传大小限制不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public values: Record<string, any>,
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
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
