import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

import { Global, Item, SharedModule } from '@shared';
import { OrgsApi } from '@shared/apis/orgs-api';
import { RolesApi } from '@shared/apis/roles-api';
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
  orgs = inject(OrgsApi);
  roles = inject(RolesApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`users`, this.users, {
    q: '',
    org_id: '',
    role_id: ''
  });

  orgItem = new Item(this.orgs);
  roleItem = new Item(this.roles);

  userData = signal<User | undefined>(undefined);

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getData();
        this.getOrgItems();
        this.getRoleItems();
      });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams();
    const { q, org_id, role_id } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    if (org_id) {
      params = params.set('org_id', org_id);
    }
    if (role_id) {
      params = params.set('role_id', role_id);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  getOrgItems(): void {
    const params = new HttpParams();
    this.orgItem.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  getRoleItems(): void {
    const params = new HttpParams();
    this.roleItem.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: User): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增成员' : `修改成员【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  openRole(user: User): void {
    this.userData.set(user);
    this.getRoleItems();
  }

  setRoleConfirm = (): Observable<boolean> => {
    if (!this.userData()) {
      return of(false);
    }
    return of(true);
    // return this.users.setRoles([this.user.id], this.user.role_id).pipe(
    //   takeUntilDestroyed(this.destroyRef),
    //   map(() => true)
    // );
  };

  confirmOk(): void {
    this.message.success(`更新成功`);
    this.getData();
  }

  delete(data: User): void {
    this.global.deleteConfirm(`成员【${data.name}】`, () => {
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
