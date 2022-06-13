import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-toolbox-values-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() data?: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      key: [null, [Validators.required]],
      value: [null, [Validators.required]]
    });
    if (this.data) {
      this.form.patchValue(this.data);
    }
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
    this.wpx
      .setValues({
        [data.key]: data.value
      })
      .subscribe(() => {
        this.message.success('设置成功');
        this.modalRef.triggerOk();
      });
  }
}
