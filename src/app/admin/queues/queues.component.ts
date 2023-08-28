import { Component, OnInit } from '@angular/core';

import { Queue } from '@common/models/queue';
import { QueuesService } from '@common/services/queues.service';
import { WpxModel, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-admin-queues',
  templateUrl: './queues.component.html'
})
export class QueuesComponent implements OnInit {
  model!: WpxModel<Queue>;

  constructor(
    private wpx: WpxService,
    private queues: QueuesService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel('queues', this.queues);
    this.model.ready().subscribe(() => {
      this.getData(true);
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
}
