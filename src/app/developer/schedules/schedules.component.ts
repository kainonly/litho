import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { JobsComponent } from './jobs/jobs.component';
import { SchedulesService } from './schedules.service';
import { Schedule } from './types';

@Component({
  selector: 'app-developer-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent implements OnInit, OnDestroy {
  /**
   * 数据
   */
  items: Array<AnyDto<Schedule>> = [];
  /**
   * 服务节点配置的唯一标识
   */
  keys: Set<string> = new Set<string>();
  /**
   * 状态
   */
  states: Record<string, any> = {};

  private states$!: Subscription;

  constructor(private schedules: SchedulesService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
    this.getKeys();
    this.updateState();
  }

  ngOnDestroy(): void {
    this.states$.unsubscribe();
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
   * 获取服务配置
   */
  getKeys(): void {
    this.schedules.list().subscribe(data => {
      this.keys.clear();
      for (const x of data) {
        this.keys.add(x);
      }
    });
  }

  /**
   * 更新服务状态
   */
  updateState(): void {
    this.states$ = timer(0, 5000)
      .pipe(
        switchMap(() => {
          const requests: Array<Observable<any>> = [];
          for (const key of this.keys.values()) {
            const req = this.schedules.get(key).pipe(
              map(v => {
                this.states[key] = v;
                return v;
              })
            );
            requests.push(req);
          }

          return forkJoin(requests);
        })
      )
      .subscribe(() => {});
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
        this.getKeys();
      }
    });
  }

  /**
   * 设置任务
   * @param doc
   */
  setJobs(doc: AnyDto<Schedule>): void {
    this.modal.create({
      nzTitle: `设置【${doc.name}】任务`,
      nzContent: JobsComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.getData();
        this.getKeys();
      }
    });
  }

  /**
   * 同步
   * @param doc
   */
  setSync(doc: AnyDto<Schedule>): void {
    this.modal.confirm({
      nzTitle: `确定同步【${doc.name}】配置吗？`,
      nzContent: '如果任务还运行中将会重置其计时起点',
      nzOnOk: () => {
        this.schedules.setSync(doc._id).subscribe(() => {
          this.message.success('配置同步成功');
          this.getKeys();
        });
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
          this.getKeys();
        });
      },
      nzCancelText: '再想想'
    });
  }
}
