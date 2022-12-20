import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '@common/types';
import { UsersService } from '@common/users.service';
import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  /**
   * 用户表格视图
   */
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<User>;
  /**
   * 字段
   */
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['email', { label: '电子邮件', type: 'string', keyword: true }],
    ['name', { label: '称呼', type: 'string', keyword: true }],
    ['status', { label: '状态', type: 'bool' }],
    ['create_time', { label: '创建时间', type: 'date' }],
    ['update_time', { label: '更新时间', type: 'date' }]
  ]);
  /**
   * 数据
   */
  dataset: WpxData<AnyDto<User>> = new WpxData<AnyDto<User>>();

  constructor(
    public users: UsersService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  /**
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<User>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.email}】`,
      nzWidth: 640,
      nzContent: FormComponent,
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
  delete(doc: AnyDto<User>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.email}】用户吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }

  /**
   * 批量删除
   */
  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要删除这些用户吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users
          .bulkDelete(
            {
              _id: { $in: [...this.dataset.checkedIds.values()] }
            },
            {
              xfilter: {
                '_id.$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success('数据删除完成');
            this.table.getData(true);
            this.dataset.clearChecked();
          });
      },
      nzCancelText: '再想想'
    });
  }
}
