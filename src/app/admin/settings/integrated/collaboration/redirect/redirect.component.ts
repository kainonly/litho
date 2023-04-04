import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-integrated-collaboration-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    redirect_url: {
      default: {
        required: $localize`跳转地址不能为空`
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
      redirect_url: [null, [Validators.required]]
    });
    this.form.patchValue(this.values);
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
