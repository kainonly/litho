import { Component, OnInit } from '@angular/core';

import { Data } from '@weplanx/common';
import { TableField } from '@weplanx/components/table';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DynamicService } from '../dynamic.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  data: Data<any> = new Data<any>();
  key?: string;
  fields!: Map<string, TableField>;

  constructor(public dynamic: DynamicService, private modal: NzModalService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.key = schema!.key;
    this.fields = new Map([
      ...Object.entries(schema?.fields ?? [])
        .filter(([k, v]) => !v.hide)
        .sort(([ak, a], [bk, b]) => a.sort - b.sort)
        .map<[string, TableField]>(([k, v]) => {
          return [
            k,
            {
              label: v.label,
              type: v.type,
              description: v.description
            }
          ];
        })
    ]);
  }

  form(editable?: any): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {
        // this.getData();
      }
    });
  }
}
