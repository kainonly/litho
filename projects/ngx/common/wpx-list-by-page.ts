import { AsyncSubject, Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';

import { ListsOption } from '../types';

export class WpxListByPage {
  /**
   * 完成初始化
   */
  readonly ready: AsyncSubject<undefined> = new AsyncSubject<undefined>();

  /**
   * 搜索字段定义
   */
  search: Record<string, any> = {};

  /**
   * 排序字段定义
   */
  sort: Record<string, number>;

  /**
   * 分页数据
   */
  data: any[] = [];

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

  checkedIds: Set<string> = new Set<string>();

  /**
   * 是否全被选中
   */
  checked: boolean = false;

  /**
   * 是否不完全被选中
   */
  indeterminate = false;

  /**
   * 被选中的数量
   */
  checkedNumber = 0;

  constructor(private storage: StorageMap, private option: ListsOption) {
    this.limit = option.limit!;
    this.sort = option.sort!;
    this.storage.get(`search:${option.id}`).subscribe(search => {
      if (!search) {
        this.search = { ...option.where };
      } else {
        this.search = search as Record<string, any>;
      }
      this.ready.next(undefined);
      this.ready.complete();
    });
  }

  /**
   * 设置数据
   */
  setData(data: any[]): void {
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
   * 更新状态属性
   */
  updateStatus(): void {
    const data = this.data.filter(v => !v.disabled);
    this.checked = data.every(v => this.checkedIds.has(v._id));
    this.indeterminate = data.some(v => this.checkedIds.has(v._id)) && !this.checked;
    this.checkedNumber = this.checkedIds.size;
  }

  /**
   * 设置选中集合
   */
  setCheckedIds(id: string, checked: boolean) {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  /**
   * 设置项目选中
   */
  setChecked(id: string, checked: boolean): void {
    this.setCheckedIds(id, checked);
    this.updateStatus();
  }

  /**
   * 设置当前页所有选中
   */
  setAllChecked(checked: boolean): void {
    this.data.filter(v => !v.disabled).forEach(v => this.setCheckedIds(v._id, checked));
    this.updateStatus();
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
}
