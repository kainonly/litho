import { HttpParams } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { OrgsApi } from '@shared/apis/orgs-api';
import { Org } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-system-orgs',
  templateUrl: './orgs.html'
})
export class Orgs implements OnInit {
  global = inject(Global);
  orgs = inject(OrgsApi);

  private destroy = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`orgs`, this.orgs, {
    q: '',
    type: 0
  });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        this.getData();
      });
  }

  setType(type: number) {
    this.m.updateSearch({ type });
    this.getData(true);
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams();
    const { q, type } = this.m.search();
    if (q) {
      params = params.set('q', q);
    }
    if (type) {
      params = params.set('type', type);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroy)).subscribe();
  }

  open(data?: Org): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增部门' : `修改部门【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: Org): void {
    this.global.deleteConfirm(`部门【${data.name}】`, () => {
      this.orgs
        .delete([data.id])
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelection(data.id);
          this.getData(true);
        });
    });
  }

  bulkDelete(): void {
    this.global.bulkDeleteConfirm(() => {
      this.orgs
        .delete([...this.m.selection.keys()])
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelections();
          this.getData(true);
        });
    });
  }
}
