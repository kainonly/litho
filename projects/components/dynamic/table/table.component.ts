import { Component, OnInit } from '@angular/core';

import { TableField } from '@weplanx/components/table';

import { DynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  key?: string;
  fields: TableField[] = [];

  constructor(public dynamic: DynamicService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.key = schema!.key;
    this.fields = [
      ...Object.entries(schema?.fields ?? [])
        .filter(([k, v]) => !v.hide)
        .sort(([ak, a], [bk, b]) => a.sort - b.sort)
        .map<TableField>(([k, v]) => {
          return {
            key: k,
            label: v.label,
            type: v.type,
            description: v.description
          };
        })
    ];
  }
}
