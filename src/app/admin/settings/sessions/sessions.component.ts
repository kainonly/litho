import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppService } from '@app';
import { User } from '@common/types';
import { UsersService } from '@common/users.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-admin-sessions',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnInit, OnDestroy {
  values: Array<AnyDto<User>> = [];
  interval = 15;
  searchText: string = '';
  readonly checkedIds: Set<string> = new Set<string>();
  checked: boolean = false;
  indeterminate = false;

  private dataSubscription!: Subscription;

  constructor(
    public app: AppService,
    private sessions: SessionsService,
    private users: UsersService,
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
    this.dataSubscription = timer(due, this.interval * 1000)
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
        this.values = [
          ...v.filter(v => {
            if (this.searchText !== '') {
              return !!v.email.match(`^${this.searchText}`);
            }
            return v;
          })
        ];
        console.debug(`session refreshed`);
      });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  setCheckedIds(id: string, checked: boolean): void {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  setChecked(id: string, checked: boolean): void {
    this.setCheckedIds(id, checked);
    this.updateCheckedStatus();
  }

  setNChecked(checked: boolean): void {
    this.values.forEach(v => this.setCheckedIds(v._id!, checked));
    this.updateCheckedStatus();
  }

  updateCheckedStatus(): void {
    this.checked = this.values.every(v => this.checkedIds.has(v._id!));
    this.indeterminate = this.values.some(v => this.checkedIds.has(v._id!)) && !this.checked;
  }

  clearChecked(): void {
    this.checked = false;
    this.indeterminate = false;
    this.checkedIds.clear();
  }

  delete(id: string): void {
    this.sessions.delete(id).subscribe(() => {
      this.message.success($localize`会话已中断`);
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要中断选中的会话吗？',
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions.clear().subscribe(() => {
          this.message.success($localize`会话已中断`);
        });
      }
    });
  }
}
