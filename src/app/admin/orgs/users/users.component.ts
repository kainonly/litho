import { Component, ViewChild } from '@angular/core';

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
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<User>;
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['email', { label: 'Email', type: 'string', keyword: true }],
    ['name', { label: 'Call', type: 'string', keyword: true }],
    ['status', { label: 'Status', type: 'bool' }],
    ['create_time', { label: 'Create Time', type: 'date', option: { time: true } }],
    ['update_time', { label: 'Update Time', type: 'date', option: { time: true } }]
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
      nzTitle: !doc ? 'Create' : `Edit【${doc.email}】`,
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
      nzTitle: `Are you sure delete the【${doc.email}】?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(doc._id).subscribe(() => {
          this.message.success('Data delete complete');
          this.table.getData(true);
        });
      },
      nzCancelText: 'Think Again'
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete these users?',
      nzOkText: 'Yes',
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
            this.message.success('Data delete complete');
            this.table.getData(true);
            this.dataset.clearChecked();
          });
      },
      nzCancelText: 'Think Again'
    });
  }
}
