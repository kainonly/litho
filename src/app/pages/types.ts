import { AnyDto, Page } from '@weplanx/ng';

export const fieldTypes = [
  {
    label: '基础字段',
    values: [
      ['string', '单行文本'],
      ['text', '多行文本'],
      ['number', '数字'],
      ['date', '日期'],
      ['dates', '日期范围'],
      ['bool', '开关'],
      ['radio', '单选框'],
      ['checkbox', '复选框'],
      ['select', '选择器']
    ]
  },
  {
    label: '复合字段',
    values: [
      ['ref', '引用'],
      ['richtext', '富文本'],
      ['picture', '图片'],
      ['video', '视频'],
      ['file', '附件'],
      ['manual', '自定义']
    ]
  }
];

export const hasOption = ['number', 'date', 'dates', 'radio', 'checkbox', 'select', 'ref', 'manual'];

export type PageNode = AnyDto<Page> & {
  disabled?: boolean;
  children?: PageNode[];
};

export type PageFlatNode = AnyDto<Page> & {
  expandable: boolean;
  level: number;
  disabled: boolean;
};

export class FilteredPageResult {
  constructor(public data: PageNode[], public needsToExpanded: PageNode[] = []) {}
}
