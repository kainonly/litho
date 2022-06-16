import { Component, OnInit } from '@angular/core';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { JobsComponent } from './jobs/jobs.component';
import { SchedulesService } from './schedules.service';
import { Schedule } from './types';

@Component({
  selector: 'wpx-admin-toolbox-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit {
  /**
   * 数据
   */
  items: Array<AnyDto<Schedule>> = [];

  constructor(private schedules: SchedulesService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
    this.schedules.getKeys().subscribe(data => {
      console.log(data);
    });
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.schedules.find({}).subscribe(data => {
      this.items = [...data];
    });
  }

  /**
   * 打开表单
   * @param doc
   */
  form(doc?: any): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 设置任务
   * @param doc
   */
  setJobs(doc: any): void {
    this.modal.create({
      nzTitle: `设置【${doc.name}】任务`,
      nzContent: JobsComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<Schedule>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.schedules.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.getData();
        });
      },
      nzCancelText: '再想想'
    });
  }
}
