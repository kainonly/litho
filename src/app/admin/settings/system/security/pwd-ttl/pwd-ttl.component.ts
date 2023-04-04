import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-system-security-pwd-ttl',
  templateUrl: './pwd-ttl.component.html'
})
export class PwdTtlComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    pwd_ttl: {
      default: {
        required: $localize`密码有效期不能为空`
      }
    }
  };
  formatterTimes = (value: number): string => $localize`${value} 天`;

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
      pwd_ttl: [0, [Validators.required]]
    });
    const data = {
      pwd_ttl: this.values['pwd_ttl'] / 86400e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    data.pwd_ttl = data.pwd_ttl * 86400e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
