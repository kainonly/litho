import { StorageMap } from '@ngx-pwa/local-storage';
import * as Ajv from 'ajv';
import { Observable } from 'rxjs';
import { ListByPageOption } from '../types/list-by-page-option';
import { SearchOption } from '../types/search-option';

export class ListByPage {
  /**
   * Search group
   */
  search: { [field: string]: SearchOption } = {};

  /**
   * Paging list data
   */
  data: any[];

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
    storage.get('search:' + option.id).subscribe((data: any) => {
      if (!data) {
        for (const value of option.query) {
          this.search[value.field] = value;
        }
      } else {
        this.search = data;
      }
    });
    storage.get('page:' + this.option.id).subscribe((index: number) => {
      this.index = index ? index : 1;
    });
  }

  setData(data: any[]): void {
    this.data = data;
  }

  /**
   * Determine whether the index exists in the search object
   */
  hasSearch(field: string) {
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
    this.checked = allChecked;
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

  toQuerySchema(): any[] {
    const schema = [];
    for (const key in this.search) {
      if (this.search.hasOwnProperty(key)) {
        const search = this.search[key];
        if (typeof search.value === 'string') {
          search.value = search.value.trim();
        }
        const ajv = new Ajv();
        const valid = ajv.validate({
          not: {
            enum: ['', 0, null, [], {}]
          }
        }, search.value);
        if (valid || search.must) {
          const value = search.op === 'like' ? `%${search.value}%` : search.value;
          schema.push([search.field, search.op, value]);
        }
      }
    }
    return schema;
  }

  persistence() {
    this.storage.set('page:' + this.option.id, this.index).subscribe(() => {
      // ok
    });
  }
}
