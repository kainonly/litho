import { Component, OnInit } from '@angular/core';

import { Filter, WpxService } from '@weplanx/ng';
import { differenceInCalendarDays } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { UsersService } from '../../orgs/users/users.service';

@Component({
  selector: 'app-security-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
  date: Date[] = [];
  searchText: string = '';
  items: any[] = [];
  skip = 0;

  constructor(
    private wpx: WpxService,
    private users: UsersService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

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
    // this.wpx
    //   .logs<LoginLog>('login_logs', filter, {
    //     xfilter: {
    //       'time.$gte': 'date',
    //       'time.$lt': 'date'
    //     }
    //   })
    //   .subscribe(v => {
    //     if (v.length === 0) {
    //       this.message.info('没有更多数据了~');
    //       return;
    //     }
    //     this.items = [...this.items, ...v];
    //     this.skip = this.items.length;
    //   });
  }

  clearSearch(): void {
    this.date = [];
    this.searchText = '';
    this.getData(true);
  }

  blockUser(data: any): void {
    this.modal.confirm({
      nzTitle: '您确定要禁用该账户吗？',
      nzContent: `用户名：${data.username}<br/>电子邮件：${data.email}<br/>UID：${data.user}`,
      nzOkDanger: true,
      nzOkText: '禁用',
      nzOnOk: () => {
        this.users.updateById(data.user, { $set: { status: false } }).subscribe(() => {
          this.message.success('已禁用该账户，将无法访问系统~');
        });
      }
    });
  }
}
