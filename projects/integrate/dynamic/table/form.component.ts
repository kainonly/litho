import { Component, Input, OnInit } from '@angular/core';

import { SchemaField, SchemaRule } from '@weplanx/ng';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { WpxDynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-table-form',
  template: ` <wpx-form [wpxFields]="fields" [wpxRules]="rules" [wpxSubmitHide]="true"></wpx-form> `
})
export class FormComponent implements OnInit {
  @Input() editable?: any;

  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];

  constructor(public dynamic: WpxDynamicService, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    const schema = this.dynamic.page!.schema;
    this.fields = [...(schema?.fields ?? [])];
    this.rules = [...(schema?.rules ?? [])];
  }
}
