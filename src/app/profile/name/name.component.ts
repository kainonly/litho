import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-name',
  templateUrl: './name.component.html'
})
export class NameComponent implements OnInit {
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, []]
    });
    this.form.patchValue(this.app.user!);
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
    this.app.setUser({ $set: 'name', name: data.name }).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
