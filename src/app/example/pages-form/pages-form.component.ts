import { Component } from '@angular/core';

import { Field, SchemaField } from '@weplanx/common';

@Component({
  selector: 'app-example-pages-form',
  templateUrl: './pages-form.component.html'
})
export class PagesFormComponent {
  fields: SchemaField[] = [
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
      key: 'labels',
      label: '标记',
      type: 'select',
      sort: 0,
      option: {
        values: [
          { label: '标记1', value: 1 },
          { label: '标记2', value: 2 },
          { label: '标记3', value: 3 }
        ],
        multiple: true
      }
    },
    {
      key: 'pages',
      label: '所属页面（单引用）',
      type: 'select',
      sort: 0,
      option: {
        reference: 'pages',
        target: '_id'
      }
    },
    {
      key: 'tags',
      label: '标签（多引用）',
      type: 'select',
      sort: 0,
      option: {
        reference: 'tags',
        target: '_id',
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
    },
    {
      key: 'article',
      label: '文章',
      type: 'richtext',
      sort: 0
    }
  ];
  rules: any[] = [];
}
