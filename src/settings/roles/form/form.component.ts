import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { RolesService } from '../roles.service';

@Component({
  selector: 'settings-roles-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: Record<string, any>;
  @Input() nodes?: NzTreeNodeOptions[];
  parentNodes?: NzTreeNodeOptions[];

  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    if (this.nodes) {
      this.parentNodes = [...this.nodes];
    }
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      key: [null, [Validators.required]],
      parent: [null],
      status: [true, [Validators.required]]
    });
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  // existsKey = (control: AbstractControl) => {
  //   if (control.value === this.editable?.key) {
  //     return null;
  //   }
  //   return this.pages.checkKey(control.value);
  // };

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.roles.api.create(data).subscribe(v => {
        if (!v.code) {
          this.message.success('数据新增完成');
          this.modal.triggerOk();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    } else {
      this.roles.api.updateOneById(this.editable._id, data).subscribe(v => {
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
