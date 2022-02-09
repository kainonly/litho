import { Component } from '@angular/core';

import { Field } from '@weplanx/common';

@Component({
  selector: 'app-example-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {
  fields: Field[] = [
    {
      key: 'name',
      label: '名称',
      type: 'string',
      required: true,
      description: '这是单行文本',
      placeholder: '请填写',
      sort: 0
    },
    {
      key: 'description',
      label: '描述',
      type: 'text',
      sort: 0
    },
    {
      key: 'total',
      label: '总数',
      type: 'number',
      default: '0',
      sort: 0,
      option: {
        max: 100,
        min: 0
      }
    },
    {
      key: 'profit',
      label: '利润',
      type: 'number',
      default: '0',
      sort: 0,
      option: {
        decimal: 2
      }
    },
    {
      key: 'apply',
      label: '申请日期',
      type: 'date',
      sort: 0
    },
    {
      key: 'complete',
      label: '完成时间',
      type: 'date',
      sort: 0,
      option: {
        time: true
      }
    },
    {
      key: 'deadline',
      label: '期限',
      type: 'between-dates',
      sort: 0
    },
    {
      key: 'status',
      label: '状态',
      type: 'bool',
      sort: 0
    },
    {
      key: 'level',
      label: '级别',
      type: 'radio',
      sort: 0,
      option: {
        values: [
          { label: '一级', value: 1 },
          { label: '二级', value: 2 },
          { label: '三级', value: 3 }
        ]
      }
    },
    {
      key: 'plus',
      label: '附加',
      type: 'checkbox',
      sort: 0,
      option: {
        values: [
          { label: '功能1', value: 1 },
          { label: '功能2', value: 2 },
          { label: '功能3', value: 3 }
        ]
      }
    },
    {
      key: 'type',
      label: '类型',
      type: 'select',
      sort: 0,
      option: {
        values: [
          { label: '类型1', value: 1 },
          { label: '类型2', value: 2 },
          { label: '类型3', value: 3 }
        ]
      }
    },
    {
      key: 'tags',
      label: '标签',
      type: 'select',
      sort: 0,
      option: {
        values: [
          { label: '标签1', value: 1 },
          { label: '标签2', value: 2 },
          { label: '标签3', value: 3 }
        ],
        multiple: true
      }
    },
    {
      key: 'pictures',
      label: '图片',
      type: 'picture',
      sort: 0
    },
    {
      key: 'videos',
      label: '视频',
      type: 'video',
      sort: 0
    }
  ];
  rules: any[] = [];
}
