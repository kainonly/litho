import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { Imessage, Metrics } from '@common/models/imessage';
import { Project } from '@common/models/project';
import { ImessagesService } from '@common/services/imessages.service';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PublishComponent, PublishInput } from '../publish/publish.component';

@Component({
  selector: 'app-admin-imessages-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input({ required: true }) doc!: AnyDto<Imessage>;
  options = ['全部', 'QoS0', 'QoS1', 'QoS2'];
  index = 0;

  projectDict: Record<string, AnyDto<Project>> = {};
  metricsDict: Record<string, Metrics> = {};

  actived?: string;

  private refresh!: Subscription;

  constructor(
    private projects: ProjectsService,
    private imessages: ImessagesService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getProjects(this.doc.projects);
    this.refresh = timer(0, 1000)
      .pipe(switchMap(() => this.imessages.getMetrics(this.doc._id)))
      .subscribe(data => {
        data.forEach(v => (this.metricsDict[v.topic] = v.metrics));
      });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  getProjects(ids: string[]): void {
    this.projects
      .find(
        { _id: { $in: ids } },
        {
          xfilter: { '_id->$in': 'oids' }
        }
      )
      .subscribe(({ data }) => {
        data.forEach(v => (this.projectDict[v._id] = v));
      });
  }

  sync(): void {
    this.imessages.createMetrics(this.doc._id).subscribe(() => {
      this.message.success('主题监控已同步');
    });
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, actived: string): void {
    this.actived = actived;
    this.contextMenu.create($event, menu);
  }

  openPublish(pid: string): void {
    this.modal.create<PublishComponent, PublishInput>({
      nzTitle: '发布消息',
      nzContent: PublishComponent,
      nzData: {
        topic: `${this.doc.topic}/${pid}`
      },
      nzWidth: 640
    });
  }
}
