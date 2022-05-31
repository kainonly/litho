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
      ['checkbox', '多选框'],
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
      ['file', '附件']
    ]
  }
];
