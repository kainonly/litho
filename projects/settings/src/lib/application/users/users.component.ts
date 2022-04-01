import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { AnyDto, WpxService } from '@weplanx/common';
import { TableField, WpxTableComponent } from '@weplanx/components/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/types';
import { FormComponent } from './form/form.component';
import { User } from './types';
import { UsersService } from './users.service';

@Component({
  selector: 'wpx-settings-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  @ViewChild(WpxTableComponent) table!: WpxTableComponent;
  roleDict: Record<string, AnyDto<Role>> = {};
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['username', { label: '用户名', type: 'string', keyword: true }],
    ['name', { label: '称呼', type: 'string' }],
    ['roles', { label: '权限组', type: 'select' }],
    ['status', { label: '状态', type: 'bool' }],
    ['create_time', { label: '创建时间', type: 'datetime' }],
    ['update_time', { label: '修改时间', type: 'datetime' }]
  ]);

  constructor(
    public users: UsersService,
    private roles: RolesService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roles.find().subscribe(data => {
      for (const x of data) {
        this.roleDict[x._id] = x;
      }
    });
  }

  /**
   * 编辑表单
   * @param editable
   */
  form(editable?: AnyDto<User>): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzWidth: 800,
      nzContent: FormComponent,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {}
    });
  }

  /**
   * 删除
   * @param data
   */
  delete(data: AnyDto<Role>): void {
    this.modal.confirm({
      nzTitle: '您确定要删除该用户吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.users.delete(data._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要删除这些用户吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const requests: Array<Observable<any>> = [];
        this.table.ds.checkedIds.forEach(value => {
          requests.push(this.users.delete(value));
        });
        forkJoin(requests).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
          this.table.ds.clearChecked();
        });
      },
      nzCancelText: '再想想'
    });
  }
}
