import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-cloud-cos',
  templateUrl: './cos.component.html'
})
export class CosComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() data!: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 秒格式化
   * @param value
   */
  formatterSec = (value: number): string => `${value} 秒`;
  /**
   * 存储单位格式化
   * @param value
   */
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
      tencent_cos_expired: [null, [Validators.required]],
      tencent_cos_limit: [null, [Validators.required]]
    });
    const data = { ...this.data };
    data['tencent_cos_expired'] = data['tencent_cos_expired'] / 1000000000;
    this.form.patchValue(data);
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    data['tencent_cos_expired'] = data['tencent_cos_expired'] * 1000000000;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
