import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { ProductsApi } from '@shared/apis/products-api';
import { Product } from '@shared/models';

import { Form, FormInput } from './form/form';

@Component({
  imports: [SharedModule],
  selector: 'app-index-market-products',
  templateUrl: './products.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products implements OnInit {
  global = inject(Global);
  productsApi = inject(ProductsApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel(`products`, this.productsApi, { q: '' });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.getData());
  }

  getData(refresh = false): void {
    if (refresh) this.m.page.set(1);
    let params = new HttpParams();
    const { q } = this.m.search();
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(data?: Product): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增产品' : `修改产品【${data.name}】`,
      nzContent: Form,
      nzData: { data },
      nzOnOk: () => this.getData(true)
    });
  }

  delete(data: Product): void {
    this.global.deleteConfirm(`产品【${data.name}】`, () => {
      this.productsApi
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
      this.productsApi
        .delete([...this.m.selection.keys()])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.m.clearSelections();
          this.getData(true);
        });
    });
  }
}
