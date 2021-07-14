import { StorageMap } from '@ngx-pwa/local-storage';
import { AsyncSubject, Observable } from 'rxjs';

import { BitCurdService } from '../bit-curd.service';
import { ListByPageOption, SearchOption, OrderOption } from '../types';

export class ListByPage {
  /**
   * 完成初始化
   * Complete initialization
   */
  ready: AsyncSubject<any> = new AsyncSubject<any>();

  /**
   * 搜索字段定义
   * Search field definition
   */
  search: { [field: string]: SearchOption } = {};

  /**
   * 排序字段定义
   * Sort field definition
   */
  order: OrderOption;

  /**
   * 分页数据
   * Paging data
   */
  data: any[] = [];

  /**
   * 加载状态
   * Loading status
   */
  loading = true;

  /**
   * 分页限制
   * Paging limit
   */
  limit = 0;

  /**
   * 分页总数
   * Total number of pages
   */
  totals = 0;

  /**
   * 分页页码
   * Pagination page number
   */
  index = 1;

  /**
   * 是否全被选中
   * Are all selected
   */
  checked = false;

  /**
   * 是否不完全被选中
   * Is it not completely selected
   */
  indeterminate = false;

  /**
   * 是否可进行批量处理
   * Whether it can be batch processed
   */
  batch = false;

  /**
   * 被选中的数量
   * Number selected
   */
  checkedNumber = 0;

  constructor(private curd: BitCurdService, private storage: StorageMap, private option: ListByPageOption) {
    this.limit = option.limit!;
    this.order = option.order!;
    this.storage.get(`search:${option.id}`).subscribe((data: any) => {
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
   * 设置数据
   * Set data
   */
  setData(data: any[]): void {
    this.data = data;
  }

  /**
   * 判断是否包含该字段的搜索条件
   * Determine whether to include the search criteria of the field
   */
  hasSearch(field: string): boolean {
    return this.search.hasOwnProperty(field);
  }

  /**
   * 主动触发搜索变动之后
   * After actively triggering the search change
   */
  afterSearch(): Observable<any> {
    return this.storage.set(`search:${this.option.id}`, this.search);
  }

  /**
   * 主动触发搜索清空之后
   * After actively triggering search and clearing
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
    return this.storage.delete(`search:${this.option.id}`);
  }

  /**
   * 更新分页列表状态
   * Update the status of the paging list
   */
  refreshStatus(): void {
    const allChecked = this.data.every(value => value.checked === true);
    const allUnchecked = this.data.every(value => !value.checked);
    this.checked = this.data.length !== 0 && allChecked;
    this.indeterminate = !allChecked && !allUnchecked;
    this.batch = this.checked || this.indeterminate;
    this.checkedNumber = this.data.filter(value => value.checked).length;
  }

  /**
   * 更改所有分页列表选中状态
   * Change the selected state of all tabbed lists
   */
  checkedAll(event: boolean): void {
    this.data.forEach(data => (data.checked = event));
    this.refreshStatus();
  }

  /**
   * 返回所有被选中的列表
   * Return all selected lists
   */
  getChecked(): any[] {
    return this.data.filter(value => value.checked);
  }

  /**
   * 获取当前的页码
   * Get the current page number
   */
  getPage(): Observable<any> {
    return this.storage.get(`page:${this.option.id}`);
  }

  /**
   * 主动执行分页页码的持久化记录
   * Actively execute persistent records of paging page numbers
   */
  persistence(): void {
    this.storage.set(`page:${this.option.id}`, this.index).subscribe(_ => _);
  }

  /**
   * 返回查询定义数组
   * Return query definition array
   */
  toQuery(): SearchOption[] {
    return Object.values(this.search);
  }

  /**
   * 返回查询语句
   * Return query statement
   */
  toQuerySchema(): any[] {
    return this.curd.getQuerySchema(this.toQuery());
  }
}
