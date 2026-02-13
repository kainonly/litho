import { HttpParams } from '@angular/common/http';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { OrgsApi } from '@shared/apis/orgs-api';
import { RolesApi } from '@shared/apis/roles-api';
import { Org, Role } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-roles',
  templateUrl: './roles.html'
})
export class Roles implements OnInit {
  global = inject(Global);
  orgs = inject(OrgsApi);
  roles = inject(RolesApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  orgItems = signal<Org[]>([]);
  orgM = computed(() => Object.fromEntries(this.orgItems().map(i => [i.id, i])));

  m = this.global.setModel(`roles`, this.roles, {
    q: '',
    org_id: ''
  });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getOrgItems();
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

  getOrgItems(): void {
    const params = new HttpParams();
    this.orgs
      .find(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        this.orgItems.set(data);
      });
  }

  open(data?: Role): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增角色' : `修改角色【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: Role): void {
    this.global.deleteConfirm(`角色【${data.name}】`, () => {
      this.roles
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
      this.roles
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
