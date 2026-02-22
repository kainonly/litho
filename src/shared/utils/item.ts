import { HttpParams } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toM } from '@shared';
import { Api } from '@shared/apis';
import { Basic } from '@shared/models';

export class Item<T extends Basic> {
  /** 列表数据 */
  readonly data = signal<T[]>([]);
  readonly dict = computed(() => toM(this.data(), item => item.id));
  /** 加载状态 */
  readonly loading = signal(false);

  constructor(private api: Api<T>) {}

  fetch(params: HttpParams): Observable<T[]> {
    this.loading.set(true);
    return this.api
      .find(params, {
        page: 1,
        pagesize: 1000
      })
      .pipe(
        map(({ data }) => {
          this.data.set(data);
          this.loading.set(false);
          return data;
        })
      );
  }
}
