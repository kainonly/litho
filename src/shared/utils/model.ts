import { HttpParams } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Any, Basic, Result, SearchOption } from '@shared/models';

import { FlagSet } from './flagset';

export class Model<T extends Basic, S extends SearchOption> {
  readonly data = signal<T[]>([]);
  readonly ids = computed(() => this.data().map(value => value.id));
  readonly loading = signal(false);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly pagesize = signal(10);

  readonly selection = new FlagSet();
  readonly checked = computed(() => {
    const filterFn = this.selectionEnabledFn();
    const data = this.data().filter(filterFn);
    const sel = this.selection;
    return data.length > 0 && data.every(v => sel.has(v.id));
  });
  readonly indeterminate = computed(() => {
    if (this.checked()) return false;
    const filterFn = this.selectionEnabledFn();
    const data = this.data().filter(filterFn);
    const sel = this.selection;
    return data.some(v => sel.has(v.id));
  });
  readonly selectionEnabledFn = signal<(v: T) => boolean>(() => true);

  readonly search = signal<S>({} as S);
  readonly searchInit: S;
  readonly sort = signal<Record<string, 'ascend' | 'descend'>>({});
  readonly order = {
    ascend: 1,
    descend: -1
  };
  reverseKeys: string[] = [];
  readonly reverseOrder = {
    ascend: -1,
    descend: 1
  };

  /**
   * @param storageKey 本地存储键名
   * @param storage 本地存储服务
   * @param api API 服务
   * @param searchInit 搜索条件初始值
   */
  constructor(
    public storageKey: string,
    private storage: StorageMap,
    private api: Api<T>,
    searchInit: S
  ) {
    this.searchInit = structuredClone(searchInit);
  }

  ready(): Observable<Any> {
    return this.storage.get(`m:${this.storageKey}`).pipe(
      map(unknow => {
        const v = unknow as Any;
        console.log(v);
        if (v?.page) {
          this.page.set(v.page);
        }
        if (v?.pagesize) {
          this.pagesize.set(v.pagesize);
        }

        if (v?.search) {
          this.search.set(structuredClone(v.search));
        } else {
          // this.search.set(structuredClone(this.searchInit));
        }
        this.sort.set(v?.sort ?? {});

        return {
          page: this.page(),
          pagesize: this.pagesize(),
          search: this.search(),
          sort: this.sort()
        };
      })
    );
  }

  /**
   * 获取数据列表
   * @param params HTTP 查询参数
   * @returns 包含结果数据的 Observable
   */
  fetch(params: HttpParams): Observable<Result<T>> {
    this.loading.set(true);
    for (const [key, value] of Object.entries(this.sort())) {
      params = params.append(
        'sort',
        `${key}:${this.reverseKeys.includes(key) ? this.reverseOrder[value] : this.order[value]}`
      );
    }
    return this.api
      .find(params, {
        page: this.page(),
        pagesize: this.pagesize()
      })
      .pipe(
        map(result => {
          this.data.set(result.data);
          this.total.set(result.total);
          this.updateStorage();
          return result;
        }),
        finalize(() => this.loading.set(false))
      );
  }

  setSort(key: string, order: NzTableSortOrder): void {
    this.sort.update(sort => {
      const next = { ...sort };
      if (!order) {
        delete next[key];
      } else {
        next[key] = order as 'ascend' | 'descend';
      }
      return next;
    });
    this.updateStorage();
  }

  setSelection(data: T): void {
    this.selection.add(data.id);
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
  }

  setCurrentSelections(checked: boolean): void {
    const sel = this.selection;
    const filterFn = this.selectionEnabledFn();
    this.data()
      .filter(filterFn)
      .forEach(v => (checked ? sel.add(v.id) : sel.delete(v.id)));
  }

  clearSelection(key: string): void {
    this.selection.delete(key);
  }

  clearSelections(): void {
    this.selection.clear();
  }

  updateSearch(v: Record<string, Any>): void {
    this.search.update(search => ({
      ...search,
      ...v
    }));
  }

  updateSearchFilter(v: Record<string, Any>): void {
    const { filter } = this.search();
    if (filter) {
      this.updateSearch({
        filter: {
          ...filter,
          ...v
        }
      });
    }
  }

  updateStorage(): void {
    this.storage
      .set(`m:${this.storageKey}`, {
        page: this.page(),
        pagesize: this.pagesize(),
        search: this.search(),
        sort: this.sort()
      })
      .subscribe();
  }
}
