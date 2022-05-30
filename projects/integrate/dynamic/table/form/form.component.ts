import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AnyDto, FormatDoc, SchemaField, SchemaRule } from '@weplanx/ng';
import { WpxFormInit } from '@weplanx/ng/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { WpxDynamicService } from '../../dynamic.service';

@Component({
  selector: 'wpx-dynamic-table-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc?: AnyDto<any>;

  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];
  format: Record<string, FormatDoc> = {};

  constructor(public dynamic: WpxDynamicService, private message: NzMessageService, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    const schema = this.dynamic.page!.schema;
    this.fields = [...(schema?.fields ?? [])].filter(v => !v.hide);
    this.rules = [...(schema?.rules ?? [])];
  }

  formInit(e: WpxFormInit): void {
    if (this.doc) {
      e.form.patchValue(this.doc);
    }
    this.format = e.format;
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit = (value: any): void => {
    if (!this.doc) {
      this.dynamic
        .create(value, {
          format_doc: this.format
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.dynamic
        .updateOneById(
          this.doc._id,
          {
            $set: value
          },
          {
            format_doc: this.format
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  };
}
