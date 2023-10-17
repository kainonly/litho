import { Component, Input, OnInit } from '@angular/core';

import { Schedule } from '@common/models/schedule';
import { SchedulesService } from '@common/services/schedules.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-admin-workflows-schedules-keys',
  templateUrl: './keys.component.html'
})
export class KeysComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Schedule>;

  items: string[] = [];
  exists = new Set<string>();

  constructor(
    private schedules: SchedulesService,
    private workflows: WorkflowsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.schedules.keys(this.doc._id).subscribe(data => {
      this.items = [...data];
      this.checkDiff();
    });
  }

  checkDiff(): void {
    this.workflows
      .find(
        { _id: { $in: this.items } },
        {
          xfilter: { '_id->$in': 'oids' },
          keys: ['_id']
        }
      )
      .subscribe(({ data }) => {
        this.exists.clear();
        data.forEach(v => this.exists.add(v._id));
      });
  }

  stopJob(key: string): void {
    this.schedules.revoke(this.doc._id, key).subscribe(() => {
      this.getData();
    });
  }
}
