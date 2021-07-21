import { Component, OnInit } from '@angular/core';

import { PageTableColumn } from '@vanx/framework';
import { BitService, ListByPage } from 'ngx-bit';

import { LogsService } from '../logs.service';
import * as packer from './language';

@Component({
  selector: 'v-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
  lists!: ListByPage;
  columns: PageTableColumn[] = [
    { key: 'username', width: '160px' },
    // { key: 'type', width: '160px' },
    // { key: 'content', breakWord: true },
    { key: 'path', breakWord: true },
    { key: 'time', width: '160px', right: true, format: 'datetime' }
  ];

  constructor(public bit: BitService, public logsService: LogsService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.lists = this.bit.listByPage({
      id: 'logs',
      query: [
        { field: 'username', op: 'like', value: '' },
        { field: 'time', op: 'between', value: [], format: 'unixtime' }
      ]
    });
  }
}
