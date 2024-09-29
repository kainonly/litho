import { HttpParams } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Any, BasicDto, FindResult, Search } from '@common';
import { Api } from '@common/utils/api';
import { StorageMap } from '@ngx-pwa/local-storage';

export class Model<T extends BasicDto, S extends Search> {
  data = signal<T[]>([]);
  ids = computed(() => this.data().map(value => value.id));
  dataFilter = computed(() => this.data().filter(v => !this.disabled.has(v.id)));
  loading = signal<boolean>(false);
  total = 0;
  page = 1;
  pagesize = 10;

  checked = false;
  indeterminate = false;
  selection = new Map<string, T>();
  disabled = new Set();

  search: S = {} as S;

  constructor(
    public key: string,
    private storage: StorageMap,
    private api: Api<T>,
    readonly searchInit: S
  ) {}

  ready(): Observable<Any> {
    return this.storage.get(this.key).pipe(
      map(unknow => {
        const v = unknow as Any;
        this.page = v?.page ?? 1;
        this.pagesize = v?.pagesize ?? 10;
        this.search = v?.search ?? this.searchInit;
        return {
          page: this.page,
          pagesize: this.pagesize,
          search: this.search
        };
      })
    );
  }

  fetch(params: HttpParams): Observable<FindResult<T>> {
    this.loading.set(true);
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

  setSelection(data: T): void {
    this.selection.set(data.id, data);
    this.updateSelectionStatus();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateSelectionStatus();
  }

  setCurrentSelections(checked: boolean): void {
    this.dataFilter().forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v.id)));
    this.updateSelectionStatus();
  }

  clearSelections(): void {
    this.selection.clear();
    this.updateSelectionStatus();
  }

  updateSelectionStatus(): void {
    const data = this.dataFilter();
    this.checked = data.every(v => this.selection.has(v.id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v.id)) : false;
  }

  private updateStatus(): void {
    this.storage
      .set(this.key, {
        page: this.page,
        pagesize: this.pagesize,
        search: this.search
      })
      .subscribe();
  }
}
