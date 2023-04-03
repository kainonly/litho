import { Component, ViewChild } from '@angular/core';

import { User } from '@common/interfaces/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-orgs-users-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent {
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<User>;
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['email', { label: '电子邮件', type: 'string', keyword: true }],
    ['name', { label: '称呼', type: 'string', keyword: true }],
    ['status', { label: '状态', type: 'bool' }],
    ['create_time', { label: '创建时间', type: 'date', option: { time: true } }],
    ['update_time', { label: '更新时间', type: 'date', option: { time: true } }]
  ]);
  dataset: WpxData<AnyDto<User>> = new WpxData<AnyDto<User>>();

  constructor(
    public users: UsersService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  form(doc?: AnyDto<User>): void {
    this.modal.create({
      nzTitle: !doc ? '创建' : `编辑【${doc.email}】`,
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

  delete(doc: AnyDto<User>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.email}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.table.getData(true);
        });
      },
      nzCancelText: $localize`再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确定删除这些用户吗？`,
      nzOkText: $localize`是的`,
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
            this.message.success($localize`数据删除成功`);
            this.table.getData(true);
            this.dataset.clearChecked();
          });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
