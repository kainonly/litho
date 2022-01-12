import { Component, OnInit } from '@angular/core';

import { AnyDto, Value, WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { RolesService } from './roles.service';
import { Role } from './types';

@Component({
  selector: 'wpx-settings-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  items: Array<AnyDto<Role>> = [];
  labels: Value[] = [{ label: '全部', value: '*' }];

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
    this.roles.find().subscribe(data => {
      this.items = [...data];
    });
  }

  getLabels(): void {
    this.roles.findLabels().subscribe(data => {
      this.labels = [{ label: '全部', value: '*' }, ...data];
    });
  }

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

  delete(data: AnyDto<Role>): void {
    this.roles.delete(data._id).subscribe(() => {
      this.message.success('数据删除完成');
      this.getData();
      this.getLabels();
    });
  }
}
