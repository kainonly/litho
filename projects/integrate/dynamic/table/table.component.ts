import { Component, OnInit, ViewChild } from '@angular/core';

import { AnyDto, Data } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Role } from '../../admin/organize/roles/types';
import { WpxDynamicService } from '../dynamic.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<any>;
  key!: string;
  fields!: Map<string, TableField>;
  data: Data<any> = new Data<any>();

  constructor(public dynamic: WpxDynamicService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page!.schema!;
    this.key = schema.key;
    this.fields = new Map([
      ...Object.entries(schema?.fields ?? [])
        .filter(([k, v]) => !v.hide)
        .sort(([ak, a], [bk, b]) => a.sort - b.sort)
        .map<[string, TableField]>(([k, v]) => {
          return [
            v.key,
            {
              label: v.label,
              type: v.type,
              description: v.description
            }
          ];
        })
    ]);
  }

  form(doc?: any): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : '编辑',
      nzContent: FormComponent,
      nzWidth: 800,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.table.getData(true);
      }
    });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<Role>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除该数据吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.dynamic.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要删除这些数据吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.dynamic
          .bulkDelete(
            {
              _id: { $in: [...this.data.checkedIds.values()] }
            },
            {
              format_filter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success('数据删除完成');
            this.table.getData(true);
            this.data.clearChecked();
          });
      },
      nzCancelText: '再想想'
    });
  }
}
