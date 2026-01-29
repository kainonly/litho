import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { ResourceActionsApi } from '@shared/apis/resource-actions';
import { ResourcesApi } from '@shared/apis/resources';
import { ResourceAction, Resource } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-access-resources-actions',
  templateUrl: './actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Actions implements OnInit {
  global = inject(Global);
  resources = inject(ResourcesApi);
  resourceActions = inject(ResourceActionsApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  resourceId!: string;
  resourceData?: Resource;
  m = this.global.setModel(`actions`, this.resourceActions, {
    q: ''
  });

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.resourceId = id;
      this.m
        .ready()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.getResource();
          this.getData();
        });
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams().set(`resource_id`, this.resourceId);
    const { q } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  getResource(): void {
    this.resources
      .findById(this.resourceId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.resourceData = data;
      });
  }

  open(data?: ResourceAction): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增操作' : `修改操作【${data.name}】`,
      nzContent: Form,
      nzData: {
        resource: this.resourceData!,
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: ResourceAction): void {
    this.global.deleteConfirm(`操作【${data.name}】`, () => {
      this.resourceActions
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
      this.resourceActions
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
