import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-extend-sms',
  templateUrl: './sms.component.html'
})
export class SmsComponent implements OnInit {
  form!: FormGroup;
  tips = {
    SmsSecretId: {
      default: {
        required: $localize`Secret Id 不能为空`
      }
    },
    SmsSecretKey: {
      default: {
        required: $localize`Secret Key 不能为空`
      }
    },
    SmsAppId: {
      default: {
        required: $localize`App Id 不能为空`
      }
    },
    SmsRegion: {
      default: {
        required: $localize`地域不能为空`
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
      SmsSecretId: [null, [Validators.required]],
      SmsSecretKey: [null, [Validators.required]],
      SmsAppId: [null, [Validators.required]],
      SmsRegion: ['ap-guangzhou', [Validators.required]]
    });
    this.form.patchValue({
      SmsSecretId: this.data['SmsSecretId'],
      SmsAppId: this.data['SmsAppId'],
      SmsRegion: this.data['SmsRegion']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
