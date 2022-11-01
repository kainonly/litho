import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';

import { SchemaField, SchemaRule } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-pages-rules-form',
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
   * 载入字段提示
   */
  @Input() fields: SchemaField[] = [];
  /**
   * 存在字段
   */
  exists: string[] = [];
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      logic: [false, [Validators.required]],
      conditions: this.fb.array([], [Validators.required]),
      keys: [[], [Validators.required]]
    });
    if (this.doc) {
      this.doc.conditions.forEach(() => this.addCondition());
      this.form.patchValue(this.doc);
    }
  }

  /**
   * 条件
   */
  get conditions(): UntypedFormArray {
    return this.form.get('conditions') as UntypedFormArray;
  }

  /**
   * 新增条件
   */
  addCondition(): void {
    this.conditions.push(
      this.fb.group({
        key: [null, [this.existsKey]],
        operate: ['eq', [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  /**
   * 检查字段命名是否重复
   * @param control
   */
  existsKey = (control: AbstractControl): any => {
    if (!control.value) {
      return { required: true };
    }
    let times = 0;
    for (const x of this.conditions.getRawValue()) {
      if (control.value === x.key) {
        times++;
      }
      this.exists = [...this.exists, x.key];
    }
    if (times > 1) {
      return { error: true, duplicated: true };
    }
    return null;
  };

  /**
   * 移除条件
   * @param index
   */
  removeCondition(index: number): void {
    this.conditions.removeAt(index);
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
      this.pages.addSchemaRule(this.id, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('规则新增完成');
      });
    } else {
      this.pages.updateSchemaRule(this.id, this.index!, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('规则更新完成');
      });
    }
  }
}
