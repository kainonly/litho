import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-acc-tasks-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
  form!: FormGroup;
  tips = {
    AccelerateAddress: {
      default: {
        required: `函数回调地址不能为空`
      }
    },
    CamUin: {
      default: {
        required: `主账号 ID 不能为空`
      }
    }
  };

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private wpx: WpxService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      AccelerateAddress: ['', [Validators.required]],
      CamUin: ['', [Validators.required]]
    });
    this.wpx.getValues(['AccelerateAddress', 'CamUin']).subscribe(data => {
      this.form.patchValue(data);
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
