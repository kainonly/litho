import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { RolesApi } from '@shared/apis/roles-api';
import { Role } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-system-roles',
  templateUrl: './roles.html'
})
export class Roles implements OnInit {
  global = inject(Global);
  roles = inject(RolesApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);
  private route = inject(ActivatedRoute);

  m = this.global.setModel(`roles`, this.roles, {
    q: ''
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
    const { q } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: Role): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增权限组' : `修改权限组【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  sort(event: CdkDragDrop<string[]>, values: Role[]): void {
    moveItemInArray(values, event.previousIndex, event.currentIndex);
    this.roles
      .sort(values.map(v => v.id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.message.success('排序成功');
        this.getData(true);
      });
  }

  delete(data: Role): void {
    this.global.deleteConfirm(`权限组【${data.name}】`, () => {
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
