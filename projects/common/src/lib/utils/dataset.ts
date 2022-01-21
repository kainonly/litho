import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

import { BasicDto, Where } from '../types';
import { Api } from './api';

export class Dataset<T extends BasicDto> {
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
   * 搜索
   */
  where: Where<T> = {};
  /**
   * 排序
   */
  sort: Record<string, NzTableSortOrder> = {};

  /**
   * 设置总数
   * @param value
   */
  setTotal(value: number): void {
    this.total = value;
  }

  /**
   * 设置数据
   */
  setData(values: T[]): void {
    this.values = [...values];
  }

  /**
   * 重置数据内容
   */
  reset(): void {
    this.pageIndex = 1;
  }

  /**
   * 从请求资源设置数据
   */
  from(api: Api<T>, refresh?: boolean): Observable<T[]> {
    this.loading = true;
    if (!!refresh) {
      this.reset();
    }
    return api.findByPage(this).pipe(
      map(data => {
        this.setData(data);
        this.loading = false;
        this.updateCheckedStatus();
        return data;
      })
    );
  }

  /**
   * 设置数据选中ID
   */
  setCheckedIds(id: string, checked: boolean): void {
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
    this.values.filter(v => !v['disabled']).forEach(v => this.setCheckedIds(v._id!, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    const data = this.values.filter(v => !v['disabled']);
    this.checked = data.every(v => this.checkedIds.has(v._id!));
    this.indeterminate = data.some(v => this.checkedIds.has(v._id!)) && !this.checked;
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
}
