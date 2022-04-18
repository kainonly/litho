import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RolesService } from '../../organize/roles/roles.service';
import { Role } from '../../organize/roles/types';
import { User } from '../../organize/users/types';
import { UsersService } from '../../organize/users/users.service';
import { SecurityService } from '../security.service';

@Component({
  selector: 'wpx-admin-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit, OnDestroy {
  searchText: string = '';
  data: Array<AnyDto<User>> = [];
  roleDict: Record<string, Role> = {};
  private dataSubscription!: Subscription;

  constructor(
    private security: SecurityService,
    private users: UsersService,
    private roles: RolesService,
    private message: NzMessageService
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
        switchMap(() => this.security.getSessions()),
        switchMap(v =>
          this.users.find(
            {
              _id: { $in: v }
            },
            {
              format_filter: { '_id.$in': 'oids' }
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
          field: ['_id', 'name'],
          format_filter: {
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
    this.security.deleteSession(id).subscribe(() => {
      this.message.success('会话已下线');
    });
  }
}
