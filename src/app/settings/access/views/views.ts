import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { MenusApi } from '@shared/apis/menus';
import { Menu } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-views',
  templateUrl: './views.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Views implements OnInit {
  global = inject(Global);
  menus = inject(MenusApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`menus`, this.menus, {
    q: ''
  });

  ngOnInit(): void {
    this.m.pagesize.set(100);
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

  open(data?: Menu): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增导航' : `修改导航【${data.name}】`,
      nzContent: Form,
      nzData: {
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: Menu): void {
    this.global.deleteConfirm(`导航【${data.name}】`, () => {
      this.menus
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
      this.menus
        .delete([...this.m.selection().keys()])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelections();
          this.getData(true);
        });
    });
  }

  sort(event: CdkDragDrop<string[]>, values: Menu[]): void {
    moveItemInArray(values, event.previousIndex, event.currentIndex);
    this.menus
      .sort(values.map(v => v.id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.message.success('排序成功');
      });
  }
}
