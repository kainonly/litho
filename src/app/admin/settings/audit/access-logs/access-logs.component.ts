import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { UsersService } from '@common/services/users.service';
import { User } from '@common/types';
import { AnyDto, Filter, WpxData } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';

import { AccessLog } from './access-log';
import { AccessLogsService } from './access-logs.service';

@Component({
  selector: 'app-admin-settings-audit-access-logs',
  templateUrl: './access-logs.component.html'
})
export class AccessLogsComponent implements OnInit {
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  date: Date[] = [];
  expands = new Set<string>();
  dataset: WpxData<AnyDto<AccessLog>> = new WpxData<AnyDto<AccessLog>>();
  userKV: Record<string, AnyDto<User>> = {};
  userDetailVisible = false;
  userDetail?: AnyDto<User>;

  constructor(private access_logs: AccessLogsService, private users: UsersService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    let filter: Filter<any> = {};
    if (this.date.length !== 0) {
      filter['timestamp'] = {
        $gte: this.date[0].toUTCString(),
        $lt: this.date[1].toUTCString()
      };
    }
    this.dataset.filter = filter;
    this.dataset.xfilter = {
      'timestamp.$gte': 'date',
      'timestamp.$lt': 'date'
    };
    this.access_logs
      .pages(this.dataset, refresh)
      .pipe(
        switchMap(data => {
          const uids = new Set();
          for (const x of data) {
            if (x.metadata.user_id) {
              uids.add(x.metadata.user_id);
            }
          }
          return this.users.find(
            {
              _id: { $in: [...uids.values()] }
            },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          );
        })
      )
      .subscribe(data => {
        for (const x of data) {
          this.userKV[x._id] = x;
        }
      });
  }

  clearSearch(): void {
    this.date = [];
    this.getData(true);
  }

  expandsChange(id: string, checked: boolean): void {
    if (checked) {
      this.expands.add(id);
    } else {
      this.expands.delete(id);
    }
  }

  openUserDetail(data: AnyDto<User>): void {
    this.userDetailVisible = true;
    this.userDetail = data;
  }

  closeUserDetail(): void {
    this.userDetailVisible = false;
    this.userDetail = undefined;
  }
}
