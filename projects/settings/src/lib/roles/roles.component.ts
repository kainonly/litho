import { Component, OnInit } from '@angular/core';

import { AnyDto, Where, WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { PermissionComponent } from './permission/permission.component';
import { RolesService } from './roles.service';
import { Role } from './types';

@Component({
  selector: 'wpx-settings-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  items: Array<AnyDto<Role>> = [];
  searchText: string = '';
  labels: string[] = [];
  matchLabels: Set<string> = new Set<string>();

  constructor(
    public roles: RolesService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getLabels();
  }

  getData(): void {
    const where: Where<Role> = {};
    if (this.searchText) {
      where['name'] = { $regex: this.searchText };
    }
    if (this.matchLabels.size !== 0) {
      where['labels'] = { $in: [...this.matchLabels.values()] };
    }
    this.roles.find(where).subscribe(data => {
      this.items = [...data];
    });
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    this.roles.findLabels().subscribe(data => {
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
  permission(editable: AnyDto<Role>): void {
    this.modal.create({
      nzTitle: `[${editable.name}] 权限设置`,
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
  form(editable?: AnyDto<Role>): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
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
  delete(data: AnyDto<Role>): void {
    this.roles.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.getData();
      this.getLabels();
    });
  }
}
