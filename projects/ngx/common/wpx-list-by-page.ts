import { AsyncSubject, Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';

import { ListsOption, SearchOption, OrderOption } from '../types';

export class WpxListByPage {
  /**
   * 完成初始化
   */
  readonly ready: AsyncSubject<undefined> = new AsyncSubject<undefined>();

  /**
   * 搜索字段定义
   */
  search: Record<string, SearchOption> = {};

  /**
   * 排序字段定义
   */
  order: OrderOption;

  /**
   * 分页数据
   */
  data: Array<Record<string, any>> = [];

  /**
   * 加载状态
   */
  loading = true;

  /**
   * 分页限制
   */
  limit = 0;

  /**
   * 分页总数
   */
  totals = 0;

  /**
   * 分页页码
   */
  index = 1;

  /**
   * 是否全被选中
   */
  checked: boolean = false;

  /**
   * 是否不完全被选中
   */
  indeterminate = false;

  /**
   * 是否可进行批量处理
   */
  batch = false;

  /**
   * 被选中的数量
   */
  checkedNumber = 0;

  constructor(private storage: StorageMap, private option: ListsOption) {
    this.limit = option.limit!;
    this.order = option.order!;
    this.storage.get(`search:${option.id}`).subscribe(search => {
      if (!search) {
        for (const value of option.query) {
          this.search[value.field] = value;
        }
      } else {
        this.search = search as { [field: string]: SearchOption };
      }
      this.ready.next(undefined);
      this.ready.complete();
    });
  }

  /**
   * 设置数据
   */
  setData(data: Array<Record<string, any>>): void {
    this.data = data;
  }

  /**
   * 判断是否包含该字段的搜索条件
   */
  hasSearch(field: string): boolean {
    return this.search.hasOwnProperty(field);
  }

  /**
   * 主动触发搜索变动之后
   */
  afterSearch(): Observable<undefined> {
    return this.storage.set(`search:${this.option.id}`, this.search);
  }

  /**
   * 主动触发搜索清空之后
   */
  clearSearch(reset: Record<string, any> = {}): Observable<undefined> {
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
   */
  checkedAll(event: boolean): void {
    this.data.forEach(data => (data.checked = event));
    this.refreshStatus();
  }

  /**
   * 返回所有被选中的列表
   */
  getChecked(): Array<Record<string, any>> {
    return this.data.filter(value => value.checked);
  }

  /**
   * 获取当前的页码
   */
  getPage(): Observable<any> {
    return this.storage.get(`page:${this.option.id}`);
  }

  /**
   * 主动执行分页页码的持久化记录
   */
  persistence(): void {
    this.storage.set(`page:${this.option.id}`, this.index).subscribe(() => {});
  }

  /**
   * 返回查询定义数组
   */
  toQuery(): SearchOption[] {
    return Object.values(this.search);
  }
}
