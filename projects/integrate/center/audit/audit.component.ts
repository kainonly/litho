import { Component, OnInit } from '@angular/core';

import { Filter, WpxService } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { UsersService } from '../../admin/organize/users/users.service';
import { LoginLog } from '../../admin/security/audit/types';

@Component({
  selector: 'wpx-center-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  date: Date[] = [];
  searchText: string = '';
  items: any[] = [];
  skip = 0;

  constructor(private wpx: WpxService, private message: NzMessageService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    if (refresh) {
      this.skip = 0;
      this.items = [];
    }
    let filter: Filter<any> = {};
    if (this.date.length !== 0) {
      filter['time'] = {
        $gte: this.date[0].toUTCString(),
        $lt: this.date[1].toUTCString()
      };
    }
    if (!!this.searchText) {
      filter['username'] = { $regex: this.searchText };
    }
    this.wpx
      .logs<LoginLog>('login_logs', filter, {
        limit: 10,
        skip: this.skip,
        format_filter: {
          'time.$gte': 'date',
          'time.$lt': 'date'
        }
      })
      .subscribe(v => {
        if (v.length === 0) {
          this.message.info('没有更多数据了~');
          return;
        }
        this.items = [...this.items, ...v];
        this.skip = this.items.length;
      });
  }

  clearSearch(): void {
    this.date = [];
    this.searchText = '';
    this.getData(true);
  }
}
