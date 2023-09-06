import { Component, Input, OnInit } from '@angular/core';

import { Imessage, Metrics } from '@common/models/imessage';
import { Project } from '@common/models/project';
import { ImessagesService } from '@common/services/imessages.service';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-imessages-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Imessage>;

  projectDict: Record<string, AnyDto<Project>> = {};
  metricsDict: Record<string, Metrics> = {};

  constructor(
    private projects: ProjectsService,
    private imessages: ImessagesService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getProjects(this.doc.projects);
    this.getMetrics();
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

  getMetrics(): void {
    this.imessages.getMetrics(this.doc._id).subscribe(data => {
      data.forEach(v => (this.metricsDict[v.topic] = v.metrics));
    });
  }

  sync(): void {
    this.imessages.createMetrics(this.doc._id).subscribe(() => {
      this.message.success('主题监控已同步');
      this.getMetrics();
    });
  }
}
