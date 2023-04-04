import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-integrated-collaboration-feishu',
  templateUrl: './feishu.component.html'
})
export class FeishuComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    feishu_app_id: {
      default: {
        required: $localize`应用 ID 不能为空`
      }
    },
    feishu_app_secret: {
      default: {
        required: $localize`应用密钥不能为空`
      }
    },
    feishu_encrypt_key: {
      default: {
        required: $localize`事件订阅安全校验数据密钥不能为空`
      }
    },
    feishu_verification_token: {
      default: {
        required: $localize`事件订阅验证令牌不能为空`
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
      feishu_app_id: [null, [Validators.required]],
      feishu_app_secret: [null, [Validators.required]],
      feishu_encrypt_key: [null, [Validators.required]],
      feishu_verification_token: [null, [Validators.required]]
    });
    this.form.patchValue({
      feishu_app_id: this.values['feishu_app_id']
    });
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
