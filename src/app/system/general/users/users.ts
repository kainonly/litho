import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { UsersApi } from '@shared/apis/users-api';
import { User } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-system-users',
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users implements OnInit {
  global = inject(Global);
  users = inject(UsersApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`users`, this.users, {
    q: '',
    org_id: ''
  });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getData();
      });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams();
    const { q, org_id } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    if (org_id) {
      params = params.set('org_id', org_id);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: User): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增用户' : `修改用户【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: User): void {
    this.global.deleteConfirm(`用户【${data.name}】`, () => {
      this.users
        .delete([data.id])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelection(data.id);
          this.getData(true);
        });
    });
  }

  bulkDelete(): void {
    this.global.bulkDeleteConfirm(() => {
      this.users
        .delete([...this.m.selection().keys()])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelections();
          this.getData(true);
        });
    });
  }
}
