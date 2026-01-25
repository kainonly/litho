import { HttpParams } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Any, Basic, Result, SearchOption } from '@shared/models';

/**
 * 通用数据模型类，用于管理列表数据的状态、分页、排序和选择
 * @template T 数据实体类型，必须继承 Basic
 * @template S 搜索选项类型，必须继承 SearchOption
 */
export class Model<T extends Basic, S extends SearchOption> {
  /** 列表数据 */
  readonly data = signal<T[]>([]);
  /** 所有数据的 ID 列表 */
  readonly ids = computed(() => this.data().map(value => value.id));
  /** 加载状态 */
  readonly loading = signal(false);
  /** 数据总数 */
  readonly total = signal(0);
  /** 当前页码 */
  readonly page = signal(1);
  /** 每页数量 */
  readonly pagesize = signal(20);

  /** 已选中的数据项 */
  readonly selection = signal(new Map<string, T>());
  /** 是否全选（当前页所有可选项都已选中） */
  readonly checked = computed(() => {
    const filterFn = this.selectionEnabledFn();
    const data = this.data().filter(filterFn);
    const sel = this.selection();
    return data.length > 0 && data.every(v => sel.has(v.id));
  });
  /** 是否部分选中（当前页有选中但未全选） */
  readonly indeterminate = computed(() => {
    if (this.checked()) return false;
    const filterFn = this.selectionEnabledFn();
    const data = this.data().filter(filterFn);
    const sel = this.selection();
    return data.some(v => sel.has(v.id));
  });
  /** 选择过滤函数，用于判断数据项是否可被选中 */
  readonly selectionEnabledFn = signal<(v: T) => boolean>(() => true);

  /** 搜索条件 */
  search: S = {} as S;
  /** 排序字段映射 */
  sort = new Map<string, 'ascend' | 'descend'>();
  /** 排序值映射（升序=1，降序=-1） */
  readonly order = {
    ascend: 1,
    descend: -1
  };
  /** 需要反转排序的字段列表 */
  reverseKeys: string[] = [];
  /** 反转排序值映射 */
  readonly reverseOrder = {
    ascend: -1,
    descend: 1
  };

  /**
   * @param storageKey 本地存储键名
   * @param storage 本地存储服务
   * @param api API 服务
   * @param searchInit 搜索条件初始值
   */
  constructor(
    public storageKey: string,
    private storage: StorageMap,
    private api: Api<T>,
    readonly searchInit: S
  ) { }

  /**
   * 从本地存储恢复状态
   * @returns 包含恢复状态的 Observable
   */
  ready(): Observable<Any> {
    return this.storage.get(`m:${this.storageKey}`).pipe(
      map(unknow => {
        const v = unknow as Any;
        this.page.set(v?.page ?? 1);
        this.pagesize.set(v?.pagesize ?? 20);
        this.search = v?.search ?? this.searchInit;
        this.sort = v?.sort ?? new Map<string, 'ascend' | 'descend'>();

        return {
          page: this.page(),
          pagesize: this.pagesize(),
          search: this.search,
          sort: this.sort
        };
      })
    );
  }

  /**
   * 获取数据列表
   * @param params HTTP 查询参数
   * @returns 包含结果数据的 Observable
   */
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
        page: this.page(),
        pagesize: this.pagesize()
      })
      .pipe(
        map(result => {
          this.data.set(result.data);
          this.total.set(result.total);
          this.updateStatus();
          this.loading.set(false);
          return result;
        })
      );
  }

  /**
   * 设置排序
   * @param key 排序字段
   * @param order 排序方向
   */
  setSort(key: string, order: NzTableSortOrder): void {
    if (!order) {
      this.sort.delete(key);
    } else {
      this.sort.set(key, order as 'ascend' | 'descend');
    }
    this.updateStatus();
  }

  /**
   * 选中一条数据
   * @param data 要选中的数据项
   */
  setSelection(data: T): void {
    this.selection.update(sel => {
      const newSel = new Map(sel);
      newSel.set(data.id, data);
      return newSel;
    });
  }

  /**
   * 取消选中一条数据
   * @param id 要取消选中的数据 ID
   */
  removeSelection(id: string): void {
    this.selection.update(sel => {
      const newSel = new Map(sel);
      newSel.delete(id);
      return newSel;
    });
  }

  /**
   * 设置当前页的选中状态
   * @param checked 是否全选当前页
   */
  setCurrentSelections(checked: boolean): void {
    this.selection.update(sel => {
      const newSel = new Map(sel);
      const filterFn = this.selectionEnabledFn();
      this.data()
        .filter(filterFn)
        .forEach(v => (checked ? newSel.set(v.id, v) : newSel.delete(v.id)));
      return newSel;
    });
  }

  /**
   * 清除指定的选中项
   * @param key 要清除的数据 ID
   */
  clearSelection(key: string): void {
    this.selection.update(sel => {
      const newSel = new Map(sel);
      newSel.delete(key);
      return newSel;
    });
  }

  /**
   * 清除所有选中项
   */
  clearSelections(): void {
    this.selection.set(new Map());
  }

  /**
   * 保存当前状态到本地存储
   */
  updateStatus(): void {
    this.storage
      .set(`m:${this.storageKey}`, {
        page: this.page(),
        pagesize: this.pagesize(),
        search: this.search,
        sort: this.sort
      })
      .subscribe();
  }

  /**
   * 更新搜索过滤条件
   * @param value 要合并的过滤条件
   */
  updateSearchFilter(value: Any): void {
    if (this.search.filter) {
      this.search.filter = {
        ...this.search.filter,
        ...value
      };
    }
  }
}
