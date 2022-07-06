import { Component, OnInit, ViewChild } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { XDoc, SchemaField, SchemaRule } from '@weplanx/ng';
import { WpxFormComponent, WpxFormInitOption } from '@weplanx/ng/form';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WpxDynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 表单视图
   */
  @ViewChild(WpxFormComponent) wpxForm!: WpxFormComponent;
  /**
   * ID
   * @private
   */
  private id?: string;
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
  format: Record<string, XDoc> = {};

  constructor(public dynamic: WpxDynamicService, private message: NzMessageService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.fields = [...(schema?.fields ?? [])];
    this.rules = [...(schema?.rules ?? [])];
  }

  /**
   * 表单初始化
   * @param option
   */
  init = (option: WpxFormInitOption): void => {
    this.dynamic
      .size({})
      .pipe(
        switchMap(v => {
          return !v ? of(null) : this.dynamic.findOne({});
        })
      )
      .subscribe(data => {
        if (!data) {
          return;
        }
        // 数据类型转换
        for (const field of this.fields) {
          switch (field.type) {
            case 'date':
              data[field.key] = new Date(data[field.key]);
              break;
            case 'dates':
              data[field.key] = [...(data[field.key] as string[]).map(v => new Date(v))];
              break;
          }
        }
        option.form.patchValue(data);
        this.id = data._id;
        this.wpxForm.updateDisplays();
      });
    this.format = option.format;
  };

  /**
   * 提交
   * @param data
   */
  submit = (data: any): void => {
    if (!this.id) {
      this.dynamic
        .create(data, {
          xdoc: this.format
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
        });
    } else {
      this.dynamic
        .updateOneById(
          this.id,
          {
            $set: data
          },
          {
            xdoc: this.format
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
        });
    }
  };
}
