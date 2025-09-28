import { HttpParams } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Any, Basic, Result, SearchOption } from '@shared/models';

export class Model<T extends Basic, S extends SearchOption> {
  data = signal<T[]>([]);
  ids = computed(() => this.data().map(value => value.id));
  loading = signal(false);
  total = 0;
  page = 1;
  pagesize = 20;

  checked = false;
  indeterminate = false;
  selection = new Map<string, T>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectionEnabledPipe = (v: T): boolean => true;

  search: S = {} as S;
  sort = new Map<string, 'ascend' | 'descend'>();
  order = {
    ascend: 1,
    descend: -1
  };
  reverseKeys: string[] = [];
  reverseOrder = {
    ascend: -1,
    descend: 1
  };

  constructor(
    public storageKey: string,
    private storage: StorageMap,
    private api: Api<T>,
    readonly searchInit: S
  ) {}

  ready(): Observable<Any> {
    return this.storage.get(`m:${this.storageKey}`).pipe(
      map(unknow => {
        const v = unknow as Any;
        this.page = v?.page ?? 1;
        this.pagesize = v?.pagesize ?? 20;
        this.search = v?.search ?? this.searchInit;
        this.sort = v?.sort ?? new Map<string, 'ascend' | 'descend'>();

        return {
          page: this.page,
          pagesize: this.pagesize,
          search: this.search,
          sort: this.sort
        };
      })
    );
  }

  fetch(params: HttpParams): Observable<Result<T>> {
    this.loading.set(true);
    this.sort.forEach((value, key) => {
      params = params.append(
        'sort',
        `${key}:${this.reverseKeys.includes(key) ? this.reverseOrder[value] : this.order[value]}`
      );
    });
    return this.api
      .find(params, {
        page: this.page,
        pagesize: this.pagesize
      })
      .pipe(
        map(result => {
          this.data.set(result.data);
          this.total = result.total;
          this.updateStatus();
          this.updateSelectionStatus();
          this.loading.set(false);
          return result;
        })
      );
  }

  setSort(key: string, order: NzTableSortOrder): void {
    if (!order) {
      this.sort.delete(key);
    } else {
      this.sort.set(key, order as 'ascend' | 'descend');
    }
    this.updateStatus();
  }

  setSelection(data: T): void {
    this.selection.set(data.id, data);
    this.updateSelectionStatus();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateSelectionStatus();
  }

  setCurrentSelections(checked: boolean): void {
    this.data()
      .filter(v => this.selectionEnabledPipe(v))
      .forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v.id)));
    this.updateSelectionStatus();
  }

  clearSelection(key: string): void {
    this.selection.delete(key);
    this.updateSelectionStatus();
  }

  clearSelections(): void {
    this.selection.clear();
    this.updateSelectionStatus();
  }

  updateSelectionStatus(): void {
    const data = this.data().filter(v => this.selectionEnabledPipe(v));
    this.checked = data.every(v => this.selection.has(v.id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v.id)) : false;
  }

  updateStatus(): void {
    this.storage
      .set(`m:${this.storageKey}`, {
        page: this.page,
        pagesize: this.pagesize,
        search: this.search,
        sort: this.sort
      })
      .subscribe();
  }

  updateSearchFilter(value: Any): void {
    if (this.search.filter) {
      this.search.filter = {
        ...this.search.filter,
        ...value
      };
    }
  }
}
