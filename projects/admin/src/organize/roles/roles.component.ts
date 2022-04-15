import { Component, ViewChild } from '@angular/core';

import { AnyDto, Data, WpxService } from '@weplanx/common';
import { TableField, WpxTableComponent } from '@weplanx/components/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { PageComponent } from './page/page.component';
import { RolesService } from './roles.service';
import { Role } from './types';

@Component({
  selector: 'wpx-admin-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent {
  @ViewChild(WpxTableComponent) table!: WpxTableComponent<Role>;
  data: Data<AnyDto<Role>> = new Data<AnyDto<Role>>();
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
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<Role>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
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
   * 设置页面
   * @param doc
   */
  page(doc: AnyDto<Role>): void {
    this.modal.create({
      nzTitle: `设置【${doc.name}】页面`,
      nzContent: PageComponent,
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
      nzTitle: `您确定要删除【${doc.name}】权限组吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.roles.delete(doc._id).subscribe(() => {
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
        this.roles
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
