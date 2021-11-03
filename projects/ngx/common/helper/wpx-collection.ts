import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import {
  CollectionOption,
  CollectionValue,
  PageData,
  CollectionStorageValue,
  WpxApi,
  SearchOption
} from '@weplanx/ngx';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

export class WpxCollection<T extends CollectionValue> {
  /**
   * 本地存储依赖
   */
  private storage!: StorageMap;
  /**
   * 表单依赖
   */
  private fb!: FormBuilder;
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
  value: T[] = [];
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
  checkedIds: Set<string> = new Set<string>();
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
   * 显示列
   */
  displayColumns: NzCheckBoxOptionInterface[] = [];
  /**
   * 显示大小
   */
  displaySize: NzTableSize = 'middle';

  searchText = '';
  searchOptions: Record<string, SearchOption> = {};

  constructor(option: CollectionOption) {
    this.key = option.key;
    this.storage = option.storage;
    this.fb = option.fb;
    this.storage.get(option.key).subscribe(unkonw => {
      const v = unkonw as CollectionStorageValue;
      if (!v) {
        this.pageSize = 10;
        this.pageIndex = 1;
        this.columns = option.columns;
        this.displaySize = 'middle';
        this.searchText = '';
        this.searchOptions = {};
        this.updateColumnsChecked();
        this.updateStorage();
      } else {
        this.pageSize = v.pageSize;
        this.pageIndex = v.pageIndex;
        this.columns = v.columns;
        this.displaySize = v.displaySize;
        this.searchText = v.searchText;
        this.searchOptions = v.searchOptions;
        this.updateColumnChecked();
      }
      this.ready.next(undefined);
      this.ready.complete();
    });
  }

  /**
   * 设置数据
   */
  set(data: PageData<T>) {
    this.value = [...data.value];
    this.total = data.total;
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
  from(api: WpxApi, refresh?: boolean): Observable<PageData<T>> {
    this.loading = true;
    if (!!refresh) {
      this.reset();
    }
    return api.findByPage<T>(this).pipe(
      map(v => {
        this.set(v);
        this.loading = false;
        this.updateStorage();
        return v;
      })
    ) as Observable<PageData<T>>;
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    const data = this.value.filter(v => !v.disabled);
    this.checked = data.every(v => this.checkedIds.has(v._id));
    this.indeterminate = data.some(v => this.checkedIds.has(v._id)) && !this.checked;
    this.checkedNumber = this.checkedIds.size;
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
  setAllChecked(checked: boolean): void {
    this.value.filter(v => !v.disabled).forEach(v => this.setCheckedIds(v._id, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新列设置全部选中状态
   */
  updateColumnsChecked(): void {
    this.columnsIndeterminate = false;
    this.columns.forEach(v => {
      v.checked = this.columnsChecked;
    });
    this.displayColumns = [...this.columns.filter(v => v.checked)];
  }

  /**
   * 更新列设置选中状态
   */
  updateColumnChecked(): void {
    this.columnsChecked = this.columns.every(v => v.checked);
    this.columnsIndeterminate = !this.columnsChecked && this.columns.some(v => v.checked);
    this.displayColumns = [...this.columns.filter(v => v.checked)];
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
        displaySize: this.displaySize,
        searchText: this.searchText,
        searchOptions: this.searchOptions
      })
      .subscribe(() => {});
  }
}
