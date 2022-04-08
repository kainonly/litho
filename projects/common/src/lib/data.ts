import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from './api';
import { AnyDto, ApiOptions, BasicDto, Filter, FormatFilter } from './types';

export class Data<T extends BasicDto> implements ApiOptions<T> {
  /**
   * 过滤
   */
  filter: Filter<T> = {};
  /**
   * 映射字段
   */
  field?: Array<keyof AnyDto<T>>;
  /**
   * 排序规则
   */
  sort: Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }> = {};
  /**
   * 筛选转换
   */
  format_filter?: Record<string, FormatFilter>;
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
   * 页码
   */
  index = 1;
  /**
   * 分页数
   */
  size = 10;
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
   * OnPush 设置数据
   */
  set(values: T[]): void {
    this.values = [...values];
  }

  /**
   * 重置数据内容
   */
  reset(): void {
    this.index = 1;
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
        this.set(data);
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
    this.values.filter(v => !v._disabled).forEach(v => this.setCheckedIds(v._id!, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    const data = this.values.filter(v => !v._disabled);
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
