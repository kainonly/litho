import { Component, OnInit } from '@angular/core';

import { PageTableColumn } from '@vanx/framework';
import { BitService, ListByPage } from 'ngx-bit';

import { ActivitiesService } from '../activities.service';
import * as packer from './language';

@Component({
  selector: 'v-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {
  lists!: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'username', width: '160px' },
    { key: 'ip', width: '160px' },
    { key: 'platform', width: '160px' },
    { key: 'device', breakWord: true },
    { key: 'risk', width: '200px' },
    { key: 'time', width: '160px', right: true, format: 'datetime' }
  ];

  constructor(public bit: BitService, public activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'activities',
      limit: 8,
      query: [
        { field: 'username', op: 'like', value: '' },
        { field: 'time', op: 'between', value: [], format: 'unixtime' }
      ]
    });
  }
}
