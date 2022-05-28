import { Component, OnInit } from '@angular/core';

import { Data, Schema } from '@weplanx/ng';
import { TableField } from '@weplanx/ng/table';
import { NzModalService } from 'ng-zorro-antd/modal';

import { WpxDynamicService } from '../dynamic.service';
import { FormComponent } from './form.component';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  private schema!: Schema;
  key!: string;
  fields!: Map<string, TableField>;
  data: Data<any> = new Data<any>();

  constructor(public dynamic: WpxDynamicService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.schema = this.dynamic.page!.schema!;
    this.key = this.schema.key;
    this.fields = new Map([
      ...Object.entries(this.schema?.fields ?? [])
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

  getData(): void {}

  form(editable?: any): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzContent: FormComponent,
      nzWidth: 600,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {
        // this.getData();
      }
    });
  }
}
