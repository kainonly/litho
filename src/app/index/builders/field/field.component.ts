import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Builder, Field } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FieldInput {
  doc: AnyDto<Builder>;
  field?: Field;
}

@Component({
  selector: 'app-index-builders-field',
  templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit {
  form!: FormGroup;
  tabIndex = 0;
  typeItems = [
    { label: '单行文本', value: 'string', icon: 'field-string', description: '标题或者描述' },
    { label: '多行文本', value: 'text', icon: 'align-left', description: '多行输入的文本域' },
    { label: '数字', value: 'number', icon: 'field-number', description: '数量、价格、百分比' },
    { label: '日期', value: 'date', icon: 'carry-out', description: '指定的日期' },
    { label: '密码', value: 'password', icon: 'lock', description: '散列加密的脱敏字段' },
    { label: '富文本', value: 'richtext', icon: 'holder', description: 'JSON 块文本编辑器' },
    { label: '开关', value: 'bool', icon: 'switcher', description: '状态控制' },
    { label: '日期范围', value: 'dates', icon: 'calendar', description: '日期范围选择器' },
    { label: '单选框', value: 'radio', icon: 'aim', description: '枚举单选框' },
    { label: '复选框', value: 'checkbox', icon: 'check', description: '枚举复选框' },
    { label: '选择器', value: 'select', icon: 'unordered-list', description: '枚举或集合标签' },
    { label: '引用', value: 'ref', icon: 'link', description: '引用外部集合' },
    { label: '图片', value: 'picture', icon: 'picture', description: '图库资源选择器' },
    { label: '视频', value: 'video', icon: 'video-camera', description: '视频资源选择器' },
    { label: '文件', value: 'file', icon: 'file-text', description: '文件资源选择器' },
    { label: '自定义', value: 'manual', icon: 'code', description: '使用自定注册组件' }
  ];

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FieldInput,
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private builders: BuildersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      placeholder: [''],
      description: [''],
      required: [false, [Validators.required]],
      visible: [false, [Validators.required]],
      default_to: [null],
      sort: [0]
    });
    if (this.data.field) {
      this.tabIndex = 1;
      this.form.patchValue(this.data.field);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.field) {
      this.builders.addSchemaField(this.data.doc._id, data).subscribe(() => {
        this.modalRef.triggerOk();
        this.message.success('字段新增完成');
      });
    } else {
      this.builders.updateSchemaField(this.data.doc._id, this.data.field.key, data).subscribe(() => {
        this.modalRef.triggerOk();
        this.message.success('字段更新完成');
      });
    }
  }
}
