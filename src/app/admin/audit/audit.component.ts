import { Component, OnInit } from '@angular/core';

import { AnyDto, WpxData } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';

import { AccessLogsService } from './access-logs.service';
import { AccessLog } from './types';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  date: Date[] = [];
  searchText: string = '';

  /**
   * 数据
   */
  accessdata: WpxData<AnyDto<AccessLog>> = new WpxData<AnyDto<AccessLog>>();

  constructor(private access_logs: AccessLogsService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.access_logs.pages(this.accessdata, refresh).subscribe(() => {});
  }

  clearSearch(): void {
    this.date = [];
    this.searchText = '';
    this.getData(true);
  }
}
