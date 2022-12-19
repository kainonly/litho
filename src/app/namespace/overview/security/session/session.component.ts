import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-overview-security-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() data!: Record<string, any>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 秒
   * @param value
   */
  formatterSec = (value: number): string => `${value} 秒`;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      session_ttl: [0, [Validators.required]]
    });
    this.form.patchValue(this.data);
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
    this.wpx.setValues(data).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
