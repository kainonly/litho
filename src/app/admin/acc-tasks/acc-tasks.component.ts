import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AccTask } from '@common/models/acc-task';
import { AccTasksService } from '@common/services/acc-tasks.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormInput } from './form/form.component';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-admin-acc-tasks',
  templateUrl: './acc-tasks.component.html'
})
export class AccTasksComponent implements OnInit {
  model!: WpxModel<AccTask>;
  syncing = false;

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private accTasks: AccTasksService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<AccTask>('acc_tasks', this.accTasks);
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch({}).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  openForm(doc?: AnyDto<AccTask>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.source}】`,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  openSetting(): void {
    this.modal.create<SettingComponent>({
      nzTitle: '资源加速设置',
      nzContent: SettingComponent
    });
  }

  sync(): void {
    this.syncing = true;
    this.accTasks.invoke().subscribe(data => {
      this.message.success(`同步已完成：${formatDate(data.date, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans')}`);
      this.syncing = false;
    });
  }

  delete(doc: AnyDto<AccTask>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.source}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.accTasks.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些项目吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.accTasks
          .bulkDelete(
            {
              _id: { $in: [...this.model.selection.keys()] }
            },
            {
              xfilter: {
                '_id->$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success(`数据删除成功`);
            this.getData(true);
            this.model.setCurrentSelections(false);
          });
      },
      nzCancelText: `再想想`
    });
  }
}
