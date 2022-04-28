import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-cloud-cos',
  templateUrl: './cos.component.html'
})
export class CosComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;
  formatterSec = (value: number): string => `${value} 秒`;
  formatterSize = (value: number): string => `${value} KB`;

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
      tencent_cos_expired: [300, [Validators.required]],
      tencent_cos_limit: [5120, [Validators.required]]
    });
    this.form.patchValue(this.data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('tencent_cos_bucket', value.tencent_cos_bucket),
      this.wpx.setVar('tencent_cos_region', value.tencent_cos_region),
      this.wpx.setVar('tencent_cos_expired', value.tencent_cos_expired),
      this.wpx.setVar('tencent_cos_limit', value.tencent_cos_limit)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
