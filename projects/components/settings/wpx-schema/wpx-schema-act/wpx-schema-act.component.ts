import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { asyncValidator } from '@weplanx/components';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Schema } from '../../types';
import { WpxSchemaService } from '../wpx-schema.service';

@Component({
  selector: 'wpx-schema-act',
  templateUrl: './wpx-schema-act.component.html'
})
export class WpxSchemaActComponent {
  form?: FormGroup;
  editable?: Schema;
  visible = false;

  @Output() readonly ok: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private schema: WpxSchemaService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  open(value?: Schema): void {
    if (value && value.system) {
      return;
    }
    this.form = this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsCollection]],
      label: [null, [Validators.required]],
      kind: ['collection', [Validators.required]]
    });
    this.visible = true;
    if (value) {
      this.editable = value;
      this.form.patchValue(value);
      this.form.get('key')?.disable();
    }
  }

  existsCollection = (control: AbstractControl) => asyncValidator(this.schema.existsCollection(control.value));

  close(): void {
    this.form = undefined;
    this.visible = false;
    this.editable = undefined;
  }

  submit(data: any): void {
    if (!this.editable) {
      this.schema.api.create(data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型创建完成');
          this.ok.next(v);
          this.close();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    } else {
      this.schema.api.update({ _id: this.editable._id }, data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型更新完成');
          this.ok.next(v);
          this.close();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    }
  }

  delete(data: any): void {
    if (data.system) {
      return;
    }
    this.modal.confirm({
      nzTitle: '您确定要作废该内容类型吗?',
      nzContent: '该操作不会真实删除数据库集合，如必须删除需要通过数据库控制完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.schema.api.delete({ _id: data._id }).subscribe(v => {
          if (v.code === 0) {
            this.notification.success('操作成功', '表单数据已提交完成');
            this.ok.emit(v);
          } else {
            this.notification.error('操作失败', v.message);
          }
        });
      },
      nzCancelText: '再想想'
    });
  }
}
