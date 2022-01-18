import { Component, OnInit } from '@angular/core';

import { AnyDto, Value, Where, WpxService } from '@weplanx/common';
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
  searchText: string = '';
  items: Array<AnyDto<Role>> = [];
  labels: Value[] = [];
  selectorLabels: Set<string> = new Set<string>();

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
      where['$or'] = [{ name: { $regex: this.searchText } }, { key: { $regex: this.searchText } }];
    }
    if (this.selectorLabels.size !== 0) {
      where['labels.value'] = { $in: [...this.selectorLabels.values()] };
    }
    this.roles.find(where).subscribe(data => {
      this.items = [...data];
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.selectorLabels.clear();
    this.getData();
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    this.roles.findLabels().subscribe(data => {
      this.labels = [...data];
    });
  }

  selectorLabelsChange(checked: boolean, data: Value, fetch = true): void {
    if (checked) {
      this.selectorLabels.add(data.value);
    } else {
      this.selectorLabels.delete(data.value);
    }
    if (fetch) {
      this.getData();
    }
  }

  selectorLabelsChangeAll(checked: boolean): void {
    this.labels.forEach(data => {
      this.selectorLabelsChange(checked, data, false);
    });
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
