import { Component, OnInit } from '@angular/core';

import { Collection, WpxService } from '@weplanx/components';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FormComponent } from './form.component';
import { ProjectsSerivce } from './projects.serivce';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  coll!: Collection<any>;

  constructor(
    private wpx: WpxService,
    private projects: ProjectsSerivce,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('apps', [
      { label: '应用名称', key: 'name', type: 'text' },
      { label: '应用描述', key: 'description', type: 'text' },
      { label: '状态', key: 'status', type: 'bool' },
      { label: '创建日期', key: 'create_time', type: 'date' },
      { label: '修改时间', key: 'update_time', type: 'date' }
    ]);
    this.coll.ready.subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    this.coll.from(this.projects.api, refresh).subscribe(v => {});
  }

  form(editable?: any) {
    this.modal.create({
      nzTitle: !editable ? '新增数据' : '编辑数据',
      nzContent: FormComponent,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(data: any): void {
    this.projects.api.deleteById([data._id]).subscribe(v => {
      if (!v.code) {
        this.message.success('该数据已删除');
        this.getData();
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
