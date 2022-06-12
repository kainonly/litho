import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page, SchemaField } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FactorySerivce } from '../../factory.serivce';

@Component({
  selector: 'wpx-admin-factory-indexes-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 页面单元
   */
  @Input() page!: AnyDto<Page>;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 字段
   */
  fields: SchemaField[] = [];
  /**
   * 存在字段
   */
  exists: string[] = [];

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private factory: FactorySerivce
  ) {}

  ngOnInit(): void {
    const fields = this.page!.schema?.fields ?? [];
    this.fields = [...fields.sort((a, b) => a.sort - b.sort)];
    this.form = this.fb.group({
      keys: this.fb.array([], [Validators.required]),
      unique: [false, [Validators.required]]
    });
  }

  /**
   * 字段表单数组控件
   */
  get keys(): FormArray {
    return this.form?.get('keys') as FormArray;
  }

  /**
   * 新增索引命名
   */
  addKeys(): void {
    this.keys.push(
      this.fb.group({
        key: [null, [this.existsKey]],
        value: [1, [Validators.required]]
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
    for (const x of this.keys.getRawValue()) {
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
   * 删除索引命名
   * @param index
   */
  removeKeys(index: number): void {
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
  submit(data: { keys: any[]; unique: boolean }): void {
    const index = `${!data.unique ? 'idx' : 'uk'}_${data.keys.map<any>(v => v.key).join('_')}`;
    this.factory.createIndex(this.page._id, index, data).subscribe(v => {
      this.modal.triggerOk();
      this.message.success('索引更新完成');
    });
  }
}
