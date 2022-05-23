import { Component, Input, OnInit } from '@angular/core';

import { SchemaField, SchemaRule } from '@weplanx/ng';

@Component({
  selector: 'wpx-dynamic-table-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: any;

  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];

  ngOnInit(): void {
    console.log(this.editable);
  }
}
