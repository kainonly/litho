import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SchemaRule } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FactorySerivce } from '../../factory.serivce';

@Component({
  selector: 'wpx-admin-factory-rules-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  @Input() id!: string;
  /**
   * 数组索引
   */
  @Input() index?: number;
  /**
   * 编辑
   */
  @Input() doc?: SchemaRule;

  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private factory: FactorySerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      logic: [false, [Validators.required]],
      conditions: this.fb.array([], [Validators.required]),
      keys: this.fb.array([], [Validators.required])
    });
    if (this.doc) {
      this.doc.conditions.forEach(() => this.addCondition());
      this.doc.keys.forEach(() => this.addKey());
      this.form.patchValue(this.doc);
    }
  }

  /**
   * 条件
   */
  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  /**
   * 新增条件
   */
  addCondition(): void {
    this.conditions.push(
      this.fb.group({
        key: [null, [Validators.required]],
        operate: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  /**
   * 移除条件
   * @param index
   */
  removeCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  /**
   * 显示字段
   */
  get keys(): FormArray {
    return this.form.get('keys') as FormArray;
  }

  /**
   * 新增显示字段
   */
  addKey(): void {
    this.keys.push(this.fb.control(null, [Validators.required]));
  }

  /**
   * 移除显示字段
   * @param index
   */
  removeKey(index: number): void {
    this.keys.removeAt(index);
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modal.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    if (!this.doc) {
      this.factory.addSchemaRule(this.id, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('规则新增完成');
      });
    } else {
      this.factory.updateSchemaRule(this.id, this.index!, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('规则更新完成');
      });
    }
  }
}
