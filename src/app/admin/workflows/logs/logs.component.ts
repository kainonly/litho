import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

import { LogsetJob } from '@common/models/logset-job';
import { Workflow } from '@common/models/workflow';
import { LogsetJobsService } from '@common/services/logset-jobs.service';
import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ResponseComponent } from '../response/response.component';

@Component({
  selector: 'app-admin-workflows-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Workflow>;
  @Input({ required: true }) index!: number;

  model!: WpxModel<LogsetJob>;
  timestamp: Date[] = [];

  constructor(
    private wpx: WpxService,
    private jobs: LogsetJobsService,
    private modal: NzModalService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<LogsetJob>(`jobs:${this.index}`, this.jobs);
    this.model
      .ready({
        'timestamp->$gte': 'date',
        'timestamp->$lt': 'date'
      })
      .subscribe(() => {
        this.getData();
      });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    const filter: Filter<LogsetJob> = {
      'metadata.key': this.doc._id,
      'metadata.index': this.index
    };
    if (this.timestamp.length !== 0) {
      filter.timestamp = {
        $gte: this.timestamp[0].toUTCString() as Any,
        $lt: this.timestamp[1].toUTCString() as Any
      };
    }
    this.model.fetch(filter).subscribe(({ data }) => {
      console.debug('fetch', data);
    });
  }

  clear(): void {
    this.timestamp = [];
    this.getData(true);
  }

  openResponse(data: AnyDto<LogsetJob>): void {
    this.modal.create<ResponseComponent, AnyDto<LogsetJob>>({
      nzTitle: `响应详情 [${formatDate(data.timestamp, 'yyyy-MM-dd HH:mm:ss', this.locale)}]`,
      nzContent: ResponseComponent,
      nzData: data,
      nzWidth: 960,
      nzFooter: null
    });
  }
}
