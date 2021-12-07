import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'app-admin-pages-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: Record<string, any>;
  form?: FormGroup;
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: ['root', [Validators.required]],
      icon: [],
      status: [false, [Validators.required]]
    });
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.pages.api.create(data).subscribe(v => {
        if (!v.code) {
          this.message.success('数据新增完成');
          this.modal.triggerOk();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    } else {
      this.pages.api.updateById(this.editable._id, data).subscribe(v => {
        if (!v.code) {
          this.message.success('数据更新完成');
          this.modal.triggerOk();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    }
  }
}
