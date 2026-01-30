import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { MenusApi } from '@shared/apis/menus';
import { RoutesApi } from '@shared/apis/routes';
import { Menu, Route } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-access-views-routes-actions',
  templateUrl: './routes.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Routes implements OnInit {
  global = inject(Global);
  menus = inject(MenusApi);
  routes = inject(RoutesApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  menuId!: string;
  menuData?: Menu;
  m = this.global.setModel(`routes`, this.routes, {
    q: ''
  });

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.menuId = id;
      this.m
        .ready()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.getMenu();
          this.getData();
        });
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams().set(`menu_id`, this.menuId);
    const { q } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  getMenu(): void {
    this.menus
      .findById(this.menuId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.menuData = data;
      });
  }

  open(data?: Route): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增路由' : `修改路由【${data.name}】`,
      nzContent: Form,
      nzData: {
        menu: this.menuData!,
        data
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(data: Route): void {
    this.global.deleteConfirm(`路由【${data.name}】`, () => {
      this.routes
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
      this.routes
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
