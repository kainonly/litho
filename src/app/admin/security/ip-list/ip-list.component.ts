import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-security-ip-list',
  templateUrl: './ip-list.component.html'
})
export class IpListComponent implements OnInit {
  /**
   * 字段
   */
  @Input() key!: 'ip_whitelist' | 'ip_blacklist';
  /**
   * 载入数据
   */
  @Input() ip!: string[];
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
      [this.key]: this.fb.array([])
    });
    this.ip.forEach(v => {
      this.append(v);
    });
  }

  get list(): FormArray {
    return this.form?.get(this.key) as FormArray;
  }

  append(value?: string): void {
    this.list.push(
      this.fb.control(value, [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        )
      ])
    );
  }

  /**
   * 移除白名单表单控件
   * @param index
   */
  remove(index: number): void {
    this.list.removeAt(index);
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
