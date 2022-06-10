import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-ip-list',
  templateUrl: './ip-list.component.html'
})
export class IpListComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() data!: Record<string, any>;
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
      ip_whitelist: this.fb.array([]),
      ip_blacklist: this.fb.array([])
    });
    (<string[]>this.data['ip_whitelist']).forEach(v => {
      this.addWhitelist(v);
    });
    (<string[]>this.data['ip_blacklist']).forEach(v => {
      this.addBlacklist(v);
    });
  }

  /**
   * 白名单表单控件数组
   */
  get whitelist(): FormArray {
    return this.form?.get('ip_whitelist') as FormArray;
  }

  /**
   * 新增白名单表单控件
   * @param value
   */
  addWhitelist(value?: string): void {
    this.whitelist.push(
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
  removeWhitelist(index: number): void {
    this.whitelist.removeAt(index);
  }

  /**
   * 获取黑名单表单控件数组
   */
  get blacklist(): FormArray {
    return this.form?.get('ip_blacklist') as FormArray;
  }

  /**
   * 新增黑名单表单控件
   * @param value
   */
  addBlacklist(value?: string): void {
    this.blacklist.push(
      this.fb.control(value, [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        )
      ])
    );
  }

  /**
   * 移除黑名单表单控件
   * @param index
   */
  removeBlacklist(index: number): void {
    this.blacklist.removeAt(index);
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
