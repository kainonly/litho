import { Component, ViewChild } from '@angular/core';

import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TableService } from './table.service';
import { Order } from './types';

@Component({
  selector: 'dev-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  /**
   * 表格视图
   */
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<Order>;
  /**
   * 固定字段
   */
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['no', { label: '订单号', type: 'string', keyword: true }],
    ['name', { label: '名称', type: 'string' }],
    ['description', { label: '描述', type: 'text' }],
    ['account', { label: '账号', type: 'string' }],
    ['customer', { label: '顾客名称', type: 'string' }],
    ['email', { label: '电子邮件', type: 'string' }],
    ['phone', { label: '手机', type: 'string' }],
    ['address', { label: '地址', type: 'text' }],
    ['price', { label: '价格', type: 'number' }],
    ['status', { label: '状态', type: 'bool' }]
  ]);
  /**
   * 数据
   */
  data: WpxData<AnyDto<Order>> = new WpxData<AnyDto<Order>>();

  constructor(
    public service: TableService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  /**
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<Order>): void {
    // this.modal.create({
    //   nzTitle: !doc ? '新增' : '编辑',
    //   nzContent: FormComponent,
    //   nzComponentParams: {
    //     doc
    //   },
    //   nzOnOk: () => {
    //     this.table.getData(true);
    //   }
    // });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<Order>): void {
    // this.modal.confirm({
    //   nzTitle: '您确定要删除吗?',
    //   nzOkText: '是的',
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.service.delete(doc._id).subscribe(() => {
    //       this.message.success('数据删除完成');
    //       this.table.getData(true);
    //     });
    //   },
    //   nzCancelText: '再想想'
    // });
  }

  /**
   * 批量删除
   */
  bulkDelete(): void {
    // this.modal.confirm({
    //   nzTitle: '您确定要删除吗?',
    //   nzOkText: '是的',
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.service
    //       .bulkDelete(
    //         {
    //           _id: { $in: [...this.data.checkedIds.values()] }
    //         },
    //         {
    //           xfilter: {
    //             '_id.$in': 'oids'
    //           }
    //         }
    //       )
    //       .subscribe(() => {
    //         this.message.success('数据删除完成');
    //         this.table.getData(true);
    //         this.data.clearChecked();
    //       });
    //   },
    //   nzCancelText: '再想想'
    // });
  }
}
