import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormatDoc, SchemaField, SchemaRule, Value } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { ApiService } from './api.service';
import { WpxFormInit } from './types';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit {
  /**
   * 载入字段
   */
  @Input() wpxFields!: SchemaField[];
  /**
   * 载入显隐规则
   */
  @Input() wpxRules!: SchemaRule[];
  /**
   * 隐藏提交按钮
   */
  @Input() wpxSubmitHide = false;
  /**
   * 提交
   * @param value 提交数据
   */
  @Input() wpxSubmit = (value: any): void => {};
  /**
   * 初始化回调
   */
  @Output() readonly wpxInit: EventEmitter<WpxFormInit> = new EventEmitter<WpxFormInit>();

  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 引用
   */
  references: Record<string, Value[]> = {};
  /**
   * 无限
   */
  infinity = Infinity;
  /**
   * 复选集合
   */
  checkBoxOptions: Record<string, NzCheckBoxOptionInterface[]> = {};

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    const controlsConfig: Record<string, any[]> = {};
    const format: Record<string, FormatDoc> = {};
    for (const x of this.wpxFields) {
      const validator: any[] = [];
      if (x.required) {
        validator.push(Validators.required);
      }
      switch (x.type) {
        case 'checkbox':
          const options: NzCheckBoxOptionInterface[] =
            x.option?.values?.map<NzCheckBoxOptionInterface>(v => ({
              label: v.label,
              value: v.value
            })) ?? [];
          this.checkBoxOptions[x.key] = options;
          break;
        case 'ref':
          const { reference, target, multiple } = x.option!;
          if (!multiple) {
            format[x.key] = 'oid';
          } else {
            format[`${x.key!}.$in`] = 'oids';
          }
          this.api.getReference(reference!, target!).subscribe(v => {
            this.references[x.key] = v;
          });
          break;
      }
      controlsConfig[x.key] = [x.default, validator];
    }
    this.form = this.fb.group(controlsConfig);
    this.wpxInit.emit({
      form: this.form,
      format
    });
  }
}
