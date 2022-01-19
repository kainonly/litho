import { Component, OnInit } from '@angular/core';

import { AnyDto, Where, WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/types';
import { FormComponent } from './form/form.component';
import { PermissionComponent } from './permission/permission.component';
import { User } from './types';
import { UsersService } from './users.service';

@Component({
  selector: 'wpx-settings-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  items: Array<AnyDto<User>> = [];
  roleDict: Record<string, AnyDto<Role>> = {};
  searchText: string = '';
  labels: string[] = [];
  matchLabels: Set<string> = new Set<string>();

  constructor(
    private users: UsersService,
    private roles: RolesService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getRoles();
    this.getLabels();
  }

  getData(): void {
    const where: Where<User> = {};
    if (this.searchText) {
      where['$or'] = [{ username: { $regex: this.searchText } }, { name: { $regex: this.searchText } }];
    }
    if (this.matchLabels.size !== 0) {
      where['labels'] = { $in: [...this.matchLabels.values()] };
    }
    this.users.find(where).subscribe(data => {
      this.items = [...data];
    });
  }

  getRoles(): void {
    this.roles.find().subscribe(data => {
      for (const x of data) {
        this.roleDict[x._id] = x;
      }
    });
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    this.users.findLabels().subscribe(data => {
      this.labels = [...data];
    });
  }

  /**
   * 设置标签状态
   * @param checked
   * @param data
   * @param fetch
   */
  matchLabelChange(checked: boolean, data: string, fetch = true): void {
    if (checked) {
      this.matchLabels.add(data);
    } else {
      this.matchLabels.delete(data);
    }
    if (fetch) {
      this.getData();
    }
  }

  /**
   * 设置所有标签
   * @param checked
   */
  matchLabelsChange(checked: boolean): void {
    this.labels.forEach(data => {
      this.matchLabelChange(checked, data, false);
    });
    this.getData();
  }

  /**
   * 清除筛选
   */
  clearSearch(): void {
    this.searchText = '';
    this.matchLabels.clear();
    this.getData();
  }

  /**
   * 权限设置表单
   * @param editable
   */
  permission(editable: AnyDto<User>): void {
    this.modal.create({
      nzTitle: `[${editable.name}] 合并权限设置`,
      nzContent: PermissionComponent,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {
        this.getData();
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
      nzOnOk: () => {
        this.getData();
        this.getLabels();
      }
    });
  }

  /**
   * 删除
   * @param data
   */
  delete(data: AnyDto<User>): void {
    this.users.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.getData();
      this.getLabels();
    });
  }
}
