import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { User } from '@common/types';
import { UsersService } from '@common/users.service';
import { AnyDto, Filter, WpxData } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';

import { LoginLog } from './login-log';
import { LoginLogsService } from './login-logs.service';

@Component({
  selector: 'app-admin-login-logs',
  templateUrl: './login-logs.component.html'
})
export class LoginLogsComponent implements OnInit {
  /**
   * 禁用日期
   */
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  /**
   * 日期区间
   */
  date: Date[] = [];

  /**
   * 数据
   */
  dataset: WpxData<AnyDto<LoginLog>> = new WpxData<AnyDto<LoginLog>>();
  /**
   * 展开集合
   */
  expand: Set<string> = new Set();
  /**
   * 成员 KeyValue
   */
  userKV: Record<string, AnyDto<User>> = {};
  /**
   * 成员详情显示
   */
  userDetailVisible = false;
  /**
   * 成员详情
   */
  userDetail?: AnyDto<User>;

  constructor(private login_logs: LoginLogsService, private users: UsersService) {}

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
    this.login_logs
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
    // this.searchText = '';
    this.getData(true);
  }

  /**
   * 展开状态更新
   */
  expandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expand.add(id);
    } else {
      this.expand.delete(id);
    }
  }

  /**
   * 打开成员详情
   */
  openUserDetail(data: AnyDto<User>): void {
    this.userDetailVisible = true;
    this.userDetail = data;
  }

  /**
   * 关闭成员详情
   */
  closeUserDetail(): void {
    this.userDetailVisible = false;
    this.userDetail = undefined;
  }
}
