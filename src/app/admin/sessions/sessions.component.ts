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
  /**
   * 数据
   */
  values: Array<AnyDto<User>> = [];
  /**
   * 刷新间隔
   */
  interval = 15;
  /**
   * 搜索文本
   */
  searchText: string = '';
  /**
   * 选中的集合ID
   */
  readonly checkedIds: Set<string> = new Set<string>();
  /**
   * 全部选中
   */
  checked: boolean = false;
  /**
   * 部分选中
   */
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
        this.message.success('在线会话已刷新');
      });
  }

  /**
   * 重置
   */
  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  /**
   * 设置数据选中ID
   */
  setCheckedIds(id: string, checked: boolean): void {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  /**
   * 设置数据选中
   */
  setChecked(id: string, checked: boolean): void {
    this.setCheckedIds(id, checked);
    this.updateCheckedStatus();
  }

  /**
   * 设置数据全部选中
   */
  setNChecked(checked: boolean): void {
    this.values.forEach(v => this.setCheckedIds(v._id!, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    this.checked = this.values.every(v => this.checkedIds.has(v._id!));
    this.indeterminate = this.values.some(v => this.checkedIds.has(v._id!)) && !this.checked;
  }

  /**
   * 取消所有选中
   */
  clearChecked(): void {
    this.checked = false;
    this.indeterminate = false;
    this.checkedIds.clear();
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
