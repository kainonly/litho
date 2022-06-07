import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      keys: this.fb.array([], [Validators.required]),
      unique: [false, [Validators.required]]
    });
  }

  get keys(): FormArray {
    return this.form?.get('keys') as FormArray;
  }

  /**
   * 新增索引命名
   */
  addKeys(): void {
    this.keys.push(
      this.fb.group({
        key: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

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
    this.factory.createIndex(this.factory.page?._id!, index, data).subscribe(v => {
      this.modal.triggerOk();
      this.message.success('索引更新完成');
    });
  }
}
