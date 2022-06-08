import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { FormatDoc, SchemaField, SchemaRule } from '@weplanx/ng';
import { WpxFormInit } from '@weplanx/ng/form';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WpxDynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
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
  format: Record<string, FormatDoc> = {};

  constructor(public dynamic: WpxDynamicService, private message: NzMessageService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.fields = [...(schema?.fields ?? [])].filter(v => !v.hide);
    this.rules = [...(schema?.rules ?? [])];
  }

  formInit(e: WpxFormInit): void {
    this.dynamic
      .count({})
      .pipe(
        switchMap(v => {
          return !v ? of(null) : this.dynamic.findOne({});
        })
      )
      .subscribe(data => {
        if (!data) {
          return;
        }
        this.id = data._id;
        e.form.patchValue(data);
      });
    this.format = e.format;
  }

  submit = (value: any): void => {
    console.log(value);
    // if (!this.id) {
    //   this.dynamic
    //     .create(value, {
    //       format_doc: this.format
    //     })
    //     .subscribe(() => {
    //       this.message.success('数据新增完成');
    //     });
    // } else {
    //   this.dynamic
    //     .updateOneById(
    //       this.id,
    //       {
    //         $set: value
    //       },
    //       {
    //         format_doc: this.format
    //       }
    //     )
    //     .subscribe(() => {
    //       this.message.success('数据更新完成');
    //     });
    // }
  };
}
