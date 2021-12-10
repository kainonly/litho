import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { asyncValidator } from '@weplanx/components';
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
  @Input() nodes?: NzTreeNodeOptions[];
  parentNodes?: NzTreeNodeOptions[];

  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    if (this.nodes) {
      this.parentNodes = [{ title: '最高级', key: 'root', isLeaf: true }, ...this.nodes];
    }
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent: ['root', [Validators.required]],
      kind: ['default', [Validators.required]],
      icon: [],
      status: [true, [Validators.required]],
      schema: this.schema
    });
    if (this.editable) {
      this.changedKind(this.editable.kind);
      this.form.patchValue(this.editable);
    }
  }

  get schema(): FormGroup {
    return this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]]
    });
  }

  existsKey = (control: AbstractControl) => {
    if (control.value === this.editable?.key) {
      console.log('ok');
      return null;
    }
    return this.pages.checkKey(control.value);
  };

  changedKind(value: string): void {
    if (value === 'group') {
      this.form?.removeControl('schema');
    } else {
      this.form?.addControl('schema', this.schema);
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
