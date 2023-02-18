import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-collaboration-feishu',
  templateUrl: './feishu.component.html'
})
export class FeishuComponent implements OnInit {
  tips = {
    feishu_app_id: {
      default: {
        required: $localize`The app id cannot be empty`
      }
    },
    feishu_app_secret: {
      default: {
        required: $localize`The app secret cannot be empty`
      }
    },
    feishu_encrypt_key: {
      default: {
        required: $localize`The encrypt key cannot be empty`
      }
    },
    feishu_verification_token: {
      default: {
        required: $localize`The verification token cannot be empty`
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
      feishu_app_id: [null, [Validators.required]],
      feishu_app_secret: [null, [Validators.required]],
      feishu_encrypt_key: [null, [Validators.required]],
      feishu_verification_token: [null, [Validators.required]]
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
