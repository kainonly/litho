import { Component, OnInit } from '@angular/core';

import { Dataset, WpxService } from '@weplanx/common';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RoleDto } from './dto/role';
import { FormComponent } from './form/form.component';
import { RolesService } from './roles.service';

@Component({
  selector: 'wpx-settings-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  ds!: Dataset<RoleDto>;

  constructor(public roles: RolesService, private wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.ds = this.wpx.dataset<RoleDto>('role', [
      { label: '名称', key: 'name', type: 'text' },
      { label: '描述', key: 'description', type: 'text' }
    ]);
    this.ds.ready.subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    this.ds.from(this.roles, refresh).subscribe(() => {});
  }

  form(editable?: any): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {},
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(data: any): void {
    // this.modal.confirm({
    //   nzTitle: '您确定要作废该页面吗?',
    //   nzContent: '该操作不会真实删除实体集合，如必须删除需要数据库工具控制完成',
    //   nzOkText: '是的',
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzMaskClosable: true,
    //   nzOnOk: () => {
    //     this.pages.api.deleteById([data._id]).subscribe(v => {
    //       if (!v.code) {
    //         this.message.success('数据删除完成');
    //         this.getData();
    //       } else {
    //         this.notification.error('操作失败', v.message);
    //       }
    //     });
    //   },
    //   nzCancelText: '再想想'
    // });
  }
}
