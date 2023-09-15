import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { Project } from '@common/models/project';
import { Queue, QueueInfo } from '@common/models/queue';
import { QueuesService } from '@common/services/queues.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PublishComponent, PublishInput } from '../publish/publish.component';

@Component({
  selector: 'app-admin-queues-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input({ required: true }) doc!: AnyDto<Queue>;
  @Input({ required: true }) project!: AnyDto<Project>;

  info?: QueueInfo;
  private refresh!: Subscription;

  constructor(
    private message: NzMessageService,
    private queues: QueuesService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.refresh = timer(0, 5000)
      .pipe(switchMap(() => this.queues.info(this.doc._id)))
      .subscribe(data => {
        this.info = data;
      });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  sync(): void {
    this.queues.sync(this.doc._id).subscribe(() => {
      this.message.success(`队列配置已同步`);
    });
  }

  openPublish(subject: string): void {
    this.modal.create<PublishComponent, PublishInput>({
      nzTitle: '发布消息',
      nzContent: PublishComponent,
      nzData: {
        subject
      },
      nzWidth: 640
    });
  }
}
