import { Component, OnInit } from '@angular/core';

import { AnyDto, WpxData } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';

import { AccessLog } from '../types';
import { AccessLogsService } from './access-logs.service';

@Component({
  selector: 'app-admin-access-logs',
  templateUrl: './access-logs.component.html'
})
export class AccessLogsComponent implements OnInit {
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  date: Date[] = [];
  searchText: string = '';
  /**
   * 数据
   */
  dataset: WpxData<AnyDto<AccessLog>> = new WpxData<AnyDto<AccessLog>>();
  /**
   * 展开集合
   */
  expand: Set<string> = new Set();

  constructor(private access_logs: AccessLogsService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.access_logs.pages(this.dataset, refresh).subscribe(() => {});
  }

  expandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expand.add(id);
    } else {
      this.expand.delete(id);
    }
  }

  clearSearch(): void {
    this.date = [];
    this.searchText = '';
    this.getData(true);
  }
}
