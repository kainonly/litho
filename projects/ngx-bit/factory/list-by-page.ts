import { StorageMap } from '@ngx-pwa/local-storage';
import { AsyncSubject, Observable } from 'rxjs';
import { ListByPageOption, SearchOption, OrderOption } from 'ngx-bit/types';
import { getQuerySchema } from 'ngx-bit/operates';

export class ListByPage {
  /**
   * initialization ready
   */
  ready: AsyncSubject<any> = new AsyncSubject<any>();

  /**
   * Search group
   */
  search: { [field: string]: SearchOption } = {};

  /**
   * Order by
   */
  order: OrderOption;

  /**
   * Paging list data
   */
  data: any[] = [];

  /**
   * loading status
   */
  loading = true;

  /**
   * Paging limit
   */
  limit = 0;

  /**
   * Lists totals
   */
  totals = 0;

  /**
   * Paging index
   */
  index = 1;

  /**
   * List data is all checked
   */
  checked = false;

  /**
   * List data has indeterminate
   */
  indeterminate = false;

  /**
   * Whether to allow batch operations
   */
  batch = false;

  /**
   * The total number of checked data in the list
   */
  checkedNumber = 0;

  /**
   * ListByPage factory class
   */
  constructor(
    private option: ListByPageOption,
    private storage: StorageMap
  ) {
    this.limit = option.limit;
    this.order = option.order;
    storage.get('search:' + option.id).subscribe((data: any) => {
      if (!data) {
        for (const value of option.query) {
          this.search[value.field] = value;
        }
      } else {
        this.search = data;
      }
      this.ready.next(data);
      this.ready.complete();
    });
  }

  /**
   * Set data
   */
  setData(data: any[]): void {
    this.data = data;
  }

  /**
   * Determine whether the index exists in the search object
   */
  hasSearch(field: string): boolean {
    return this.search.hasOwnProperty(field);
  }

  /**
   * Manually trigger search change after
   */
  afterSearch(): Observable<any> {
    return this.storage.set('search:' + this.option.id, this.search);
  }

  /**
   * Manually trigger search clear
   */
  clearSearch(reset: any = {}): Observable<any> {
    for (const key in this.search) {
      if (this.search.hasOwnProperty(key)) {
        const search = this.search[key];
        if (reset.hasOwnProperty(search.field)) {
          search.value = reset[search.field];
        } else {
          search.value = '';
        }
      }
    }
    return this.storage.delete('search:' + this.option.id);
  }

  /**
   * Refresh list data selection status
   */
  refreshStatus(): void {
    const allChecked = this.data.every((value) => value.checked === true);
    const allUnchecked = this.data.every((value) => !value.checked);
    this.checked = this.data.length !== 0 && allChecked;
    this.indeterminate = !allChecked && !allUnchecked;
    this.batch = this.checked || this.indeterminate;
    this.checkedNumber = this.data.filter((value) => value.checked).length;
  }

  /**
   * Unified change of all list data status
   */
  checkedAll(event: boolean): void {
    this.data.forEach((data) => (data.checked = event));
    this.refreshStatus();
  }

  /**
   * Get checked lists
   */
  getChecked(): any[] {
    return this.data.filter(value => value.checked);
  }

  /**
   * Get pagination
   */
  getPage(): Observable<any> {
    return this.storage.get('page:' + this.option.id);
  }

  /**
   * Persistent settings
   */
  persistence(): void {
    this.storage.set('page:' + this.option.id, this.index).subscribe(() => {
      // ok
    });
  }

  /**
   * Convert to SearchOption[]
   */
  toQuery(): SearchOption[] {
    const query = [];
    for (const key in this.search) {
      if (this.search.hasOwnProperty(key)) {
        query.push(this.search[key]);
      }
    }
    return query;
  }

  /**
   * Convert to query schema
   */
  toQuerySchema(): any[] {
    return getQuerySchema(Object.values(this.search));
  }
}
