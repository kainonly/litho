import { Component, Input, OnInit } from '@angular/core';

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
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<any>;
  /**
   * 设置字段
   */
  fields: SchemaField[] = [];
  /**
   * 设置显隐规则
   */
  rules: SchemaRule[] = [];
  /**
   * 设置格式化
   */
  format: Record<string, FormatDoc> = {};

  constructor(public dynamic: WpxDynamicService, private message: NzMessageService, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    const schema = this.dynamic.page!.schema;
    this.fields = [...(schema?.fields ?? [])].filter(v => !v.hide);
    this.rules = [...(schema?.rules ?? [])];
  }

  /**
   * 初始化表单
   * @param e
   */
  formInit(e: WpxFormInit): void {
    if (this.doc) {
      e.form.patchValue(this.doc);
    }
    this.format = e.format;
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
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
