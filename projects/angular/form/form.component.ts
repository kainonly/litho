import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SchemaField, SchemaRule, SchemaRuleCondition, Value, WpxService, XDoc } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { WpxFormInitOption } from './types';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit, OnDestroy {
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
   * 初始化回调
   * @param option 配置
   */
  @Input() wpxInit = (option: WpxFormInitOption): void => {};
  /**
   * 提交回调
   * @param value 提交数据
   */
  @Input() wpxSubmit = (value: any): void => {};

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
  /**
   * 显隐状态
   */
  displays: string[] = [];
  /**
   * 订阅
   */
  onchangekeySubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public wpx: WpxService) {}

  ngOnInit(): void {
    const onchangekeys = new Set((<string[]>[]).concat(...this.wpxRules.map(v => v.conditions.map(v => v.key))));
    const controlsConfig: Record<string, any[]> = {};
    const format: Record<string, XDoc> = {};
    for (const field of this.wpxFields) {
      const validator: any[] = [];
      if (field.required) {
        validator.push(Validators.required);
      }
      switch (field.type) {
        case 'checkbox':
          const options: NzCheckBoxOptionInterface[] =
            field.option?.values?.map<NzCheckBoxOptionInterface>(v => ({
              label: v.label,
              value: v.value
            })) ?? [];
          this.checkBoxOptions[field.key] = options;
          break;
        case 'ref':
          const { reference, target, multiple } = field.option!;
          if (!multiple) {
            format[field.key] = 'oid';
          } else {
            format[`${field.key!}.$in`] = 'oids';
          }
          this.wpx.getRefValues(reference!, target!).subscribe(v => {
            this.references[field.key] = v;
          });
          break;
      }
      controlsConfig[field.key] = [field.default, validator];
    }
    this.form = this.fb.group(controlsConfig);
    this.onchangekeySubscriptions = [];
    for (const key of onchangekeys.values()) {
      const subscription = this.form.get(key)!.valueChanges.subscribe(() => {
        this.updateDisplays();
      });
      this.onchangekeySubscriptions = [...this.onchangekeySubscriptions, subscription];
    }
    this.wpxInit({
      form: this.form,
      format
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.onchangekeySubscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * 关联配置
   * @param ref
   * @param field
   */
  setInput(ref: CdkPortalOutletAttachedRef, field: SchemaField): void {
    ref = ref as ComponentRef<any>;
    ref.instance['form'] = this.form;
    ref.instance['field'] = field;
  }

  /**
   * 更新显隐状态
   */
  updateDisplays(): void {
    this.displays = [];
    for (const rule of this.wpxRules) {
      switch (rule.logic) {
        case 'and':
          if (rule.conditions.every(condition => this.conditionParse(condition))) {
            this.displays = [...this.displays, ...rule.keys];
          }
          break;
        case 'or':
          if (rule.conditions.some(condition => this.conditionParse(condition))) {
            this.displays = [...this.displays, ...rule.keys];
          }
          break;
      }
    }
  }

  /**
   * 条件转换结果
   * @param condition
   */
  conditionParse(condition: SchemaRuleCondition): boolean {
    const value = this.form.getRawValue()[condition.key];
    switch (condition.operate) {
      case 'eq':
        return value === condition.value;
      case 'ne':
        return value !== condition.value;
      case 'in':
        return (value as any[]).includes(condition.value);
      case 'nin':
        return !(value as any[]).includes(condition.value);
    }
    return false;
  }
}
