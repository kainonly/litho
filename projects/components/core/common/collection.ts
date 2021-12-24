import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

import { CollectionOption, CollectionValue, CollectionStorageValue, SearchOption, Field } from '../types';
import { Api } from './api';

export class Collection<T extends CollectionValue> {
  /**
   * 本地存储依赖
   */
  private storage!: StorageMap;
  /**
   * 本地存储键名称
   */
  private key!: string;
  /**
   * 初始化完毕
   */
  readonly ready: AsyncSubject<undefined> = new AsyncSubject<undefined>();
  /**
   * 加载状态
   */
  loading = true;
  /**
   * 总数
   */
  total = 0;
  /**
   * 集合数据
   */
  values: T[] = [];
  /**
   * 每页的数量
   */
  pageSize = 10;
  /**
   * 当前页码
   */
  pageIndex = 1;
  /**
   * 选中的集合ID
   */
  readonly checkedIds: Set<string> = new Set<string>();
  /**
   * 全部选中
   */
  checked: boolean = false;
  /**
   * 部分选中
   */
  indeterminate = false;
  /**
   * 被选中的数量
   */
  checkedNumber = 0;
  /**
   * 字段
   */
  readonly fields!: Field[];
  /**
   * 列设置
   */
  columns: NzCheckBoxOptionInterface[] = [];
  /**
   * 显示全部列
   */
  columnsChecked = true;
  /**
   * 显示部分列
   */
  columnsIndeterminate = false;
  /**
   * 表格密度大小
   */
  columnsHeight: NzTableSize = 'middle';
  /**
   * 表格自定义宽
   */
  columnsWidth: Record<string, string> = {};
  /**
   * 显示列
   */
  displayColumns: NzCheckBoxOptionInterface[] = [];
  /**
   * 全文搜索
   */
  searchText = '';
  /**
   * 字段搜索
   */
  searchOptions: Record<string, SearchOption> = {};
  /**
   * 字段排序
   */
  sortOptions: Record<string, NzTableSortOrder> = {};

  constructor(option: CollectionOption) {
    this.key = option.key;
    this.storage = option.storage;
    this.fields = option.fields;
    this.storage.get(option.key).subscribe(unkonw => {
      const v = unkonw as CollectionStorageValue;
      if (!v) {
        this.pageSize = 10;
        this.pageIndex = 1;
        this.columns = [...this.fields.map(v => <NzCheckBoxOptionInterface>{ label: v.label, value: v.key })];
        this.columnsHeight = 'middle';
        this.columnsWidth = {};
        this.searchText = '';
        this.searchOptions = {};
        this.sortOptions = {};
        this.updateColumnsChecked();
        this.updateStorage();
      } else {
        this.pageSize = v.pageSize;
        this.pageIndex = v.pageIndex;
        this.columns = v.columns;
        this.columnsHeight = v.columnsHeight;
        this.columnsWidth = v.columnsWidth;
        this.searchText = v.searchText;
        this.searchOptions = v.searchOptions;
        this.sortOptions = v.sortOptions;
        this.updateColumnChecked();
      }
      this.ready.next(undefined);
      this.ready.complete();
    });
  }

  setTotal(value: number) {
    this.total = value;
  }

  /**
   * 设置数据
   */
  setData(values: T[]) {
    this.values = [...values];
  }

  /**
   * 重置数据内容
   */
  reset(): void {
    this.pageIndex = 1;
    this.storage.delete(this.key).subscribe(() => {});
  }

  /**
   * 从请求资源设置数据
   */
  from(api: Api<T>, refresh?: boolean): Observable<T[]> {
    this.loading = true;
    if (!!refresh) {
      this.reset();
    }
    return api.findByPage<T>(this).pipe(
      map(data => {
        this.setData(data);
        this.loading = false;
        this.updateCheckedStatus();
        this.updateStorage();
        return data;
      })
    );
  }

  /**
   * 设置数据选中ID
   */
  setCheckedIds(id: string, checked: boolean) {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  /**
   * 设置数据选中
   */
  setChecked(id: string, checked: boolean): void {
    this.setCheckedIds(id, checked);
    this.updateCheckedStatus();
  }

  /**
   * 设置数据全部选中
   */
  setNChecked(checked: boolean): void {
    this.values.filter(v => !v.disabled).forEach(v => this.setCheckedIds(v._id, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    const data = this.values.filter(v => !v.disabled);
    this.checked = data.every(v => this.checkedIds.has(v._id));
    this.indeterminate = data.some(v => this.checkedIds.has(v._id)) && !this.checked;
    this.checkedNumber = this.checkedIds.size;
  }

  /**
   * 取消所有选中
   */
  clearChecked(): void {
    this.checked = false;
    this.indeterminate = false;
    this.checkedIds.clear();
    this.checkedNumber = 0;
  }

  /**
   * 更新显示列
   */
  updateDisplayColumns(): void {
    this.displayColumns = [...this.columns.filter(v => v.checked)];
  }

  /**
   * 更新列设置全部选中状态
   */
  updateColumnsChecked(): void {
    this.columnsIndeterminate = false;
    this.columns.forEach(v => {
      v.checked = this.columnsChecked;
    });
    this.updateDisplayColumns();
  }

  /**
   * 更新列设置选中状态
   */
  updateColumnChecked(): void {
    this.columnsChecked = this.columns.every(v => v.checked);
    this.columnsIndeterminate = !this.columnsChecked && this.columns.some(v => v.checked);
    this.updateDisplayColumns();
    this.updateStorage();
  }

  /**
   * 列设置重置
   */
  columnsReset(): void {
    this.columnsHeight = 'middle';
    this.columnsWidth = {};
    this.columnsChecked = true;
    this.updateColumnsChecked();
    this.updateStorage();
  }

  /**
   * 更新本地存储
   */
  updateStorage(): void {
    this.storage
      .set(this.key, <CollectionStorageValue>{
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        columns: this.columns,
        columnsHeight: this.columnsHeight,
        columnsWidth: this.columnsWidth,
        searchText: this.searchText,
        searchOptions: this.searchOptions,
        sortOptions: this.sortOptions
      })
      .subscribe(() => {});
  }
}
