import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RolesService } from '@orgs/roles/roles.service';
import { Role } from '@orgs/roles/types';
import { User } from '@orgs/users/types';
import { UsersService } from '@orgs/users/users.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-monitor-sessions',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnInit, OnDestroy {
  searchText: string = '';
  data: Array<AnyDto<User>> = [];
  roleDict: Record<string, Role> = {};
  private dataSubscription!: Subscription;

  constructor(
    private sessions: SessionsService,
    private users: UsersService,
    private roles: RolesService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  getData(due = 0): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.dataSubscription = timer(due, 5000)
      .pipe(
        switchMap(() => this.sessions.get()),
        switchMap(v =>
          this.users.find(
            {
              _id: { $in: v }
            },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          )
        )
      )
      .subscribe(v => {
        this.data = [
          ...v.filter(v => {
            if (this.searchText !== '') {
              return !!v.username.match(`^${this.searchText}`);
            }
            return v;
          })
        ];
        this.getRoles([...new Set((<string[]>[]).concat(...v.map(v => v.roles)))]);
      });
  }

  getRoles(ids: string[]): void {
    this.roles
      .find(
        {
          _id: { $in: ids }
        },
        {
          keys: { name: 1 },
          xfilter: {
            '_id.$in': 'oids'
          }
        }
      )
      .subscribe(v => {
        for (const x of v) {
          this.roleDict[x._id] = x;
        }
      });
  }

  delete(id: string): void {
    this.sessions.delete(id).subscribe(() => {
      this.message.success('会话已下线');
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要中断全部会话吗？',
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions.clear().subscribe(() => {
          this.message.success('会话已下线');
        });
      }
    });
  }
}
