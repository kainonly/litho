import { Component, Input, OnInit } from '@angular/core';

import { SchemaField, SchemaRule } from '@weplanx/common';
import { AnyDto, XData } from '@weplanx/ng';
import { WpxFormInitOption } from '@weplanx/ng/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { WpxDynamicService } from '../../dynamic.service';

@Component({
  selector: 'wpx-dynamic-table-form',
  templateUrl: './form.component.html',
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
  format: Record<string, XData> = {};

  constructor(public dynamic: WpxDynamicService, private message: NzMessageService, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    const schema = this.dynamic.page!.schema;
    this.fields = [...(schema?.fields ?? [])].filter((v) => !v.hide);
    this.rules = [...(schema?.rules ?? [])];
  }

  /**
   * 初始化表单
   * @param option
   */
  init = (option: WpxFormInitOption): void => {
    if (this.doc) {
      const data = { ...this.doc };
      // 数据类型转换
      for (const field of this.fields) {
        switch (field.type) {
          case 'date':
            data[field.key] = new Date(data[field.key]);
            break;
          case 'dates':
            data[field.key] = [...(data[field.key] as string[]).map((v) => new Date(v))];
            break;
        }
      }
      option.form.patchValue(data);
    }
    this.format = option.format;
  };

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
  submit = (data: any): void => {
    if (!this.doc) {
      this.dynamic
        .create(data, {
          xdata: this.format,
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.dynamic
        .updateById(
          this.doc._id,
          {
            $set: data,
          },
          {
            xdata: this.format,
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  };
}
