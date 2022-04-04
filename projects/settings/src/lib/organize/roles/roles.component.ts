import { Component, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { AnyDto, WpxService } from '@weplanx/common';
import { TableField, WpxTableComponent } from '@weplanx/components/table';
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
export class RolesComponent {
  @ViewChild(WpxTableComponent) table!: WpxTableComponent;
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['name', { label: '权限名称', type: 'string', keyword: true }],
    ['description', { label: '描述', type: 'text' }],
    ['status', { label: '状态', type: 'bool' }]
  ]);

  constructor(
    public roles: RolesService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

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
        this.table.getData(true);
      }
    });
  }

  /**
   * 删除
   * @param data
   */
  delete(data: AnyDto<Role>): void {
    this.modal.confirm({
      nzTitle: '您确定要删除该权限吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.roles.delete(data._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.table.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要删除这些权限吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const requests: Array<Observable<any>> = [];
        this.table.ds.checkedIds.forEach(value => {
          requests.push(this.roles.delete(value));
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
