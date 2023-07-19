import { computed, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnyDto, BasicDto, WpxModelStore } from '../types';
import { WpxStoreService } from '../wpx-store.service';

export class WpxModel<T extends BasicDto> {
  data = signal<AnyDto<T>[]>([]);
  dataFilter = computed(() => this.data().filter(v => !v['disabled']));

  total = 0;
  page = 1;
  pagesize = 20;

  checked = false;
  indeterminate = false;
  selection: Map<string, T> = new Map<string, T>();

  constructor(
    private key: string,
    private store: WpxStoreService
  ) {}

  get options() {
    return {
      page: this.page,
      pagesize: this.pagesize
    };
  }

  ready(): Observable<WpxModelStore> {
    return this.store.get<WpxModelStore>(this.key).pipe(
      map(v => {
        this.page = v?.page ?? 1;
        this.pagesize = v?.pagesize ?? 20;
        return {
          page: this.page,
          pagesize: this.pagesize
        };
      })
    );
  }

  set(v: { data: AnyDto<T>[]; total: number }): void {
    this.data.set(v.data);
    this.total = v.total;
    this.updateStatus();
    this.updateSelectionStatus();
  }

  clear(): void {
    this.data.set([]);
    this.page = 1;
    this.total = 0;
  }

  setSelection(data: T): void {
    this.selection.set(data._id, data);
    this.updateSelectionStatus();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateSelectionStatus();
  }

  setCurrentSelection(checked: boolean): void {
    this.dataFilter().forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v._id)));
    this.updateSelectionStatus();
  }

  clearSelection(): void {
    this.checked = false;
    this.indeterminate = false;
    this.selection.clear();
  }

  private updateSelectionStatus(): void {
    const data = this.dataFilter();
    this.checked = data.every(v => this.selection.has(v._id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v._id)) : false;
  }

  private updateStatus(): void {
    this.store.set<WpxModelStore>(this.key, {
      page: this.page,
      pagesize: this.pagesize
    });
  }
}
