import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-cloud-cos',
  templateUrl: './cos.component.html'
})
export class CosComponent implements OnInit {
  form!: FormGroup;
  tips = {
    TencentCosBucket: {
      default: {
        required: `Bucket 名称不能为空`
      }
    },
    TencentCosRegion: {
      default: {
        required: `地区不能为空`
      }
    },
    TencentCosExpired: {
      default: {
        required: `预签名有效期不能为空`
      }
    },
    TencentCosLimit: {
      default: {
        required: `上传大小限制不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      TencentCosBucket: [null, [Validators.required]],
      TencentCosRegion: [null, [Validators.required]],
      TencentCosExpired: [null, [Validators.required]],
      TencentCosLimit: [null, [Validators.required]]
    });
    const data = { ...this.data };
    this.form.patchValue(data);
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
