import { Component } from '@angular/core';

import { Field } from '@weplanx/common';

@Component({
  selector: 'app-example-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
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
    }
  ];
  rules: any[] = [];
}
