import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { CollectionOption, CollectionType, PageData, PageOption, WpxApi } from '@weplanx/ngx';

export class WpxCollection<T extends CollectionType> {
  private key!: string;
  private storage!: StorageMap;
  /**
   * 完成初始化
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
  limit = 0;
  /**
   * 当前页码
   */
  index = 1;
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

  constructor(option: CollectionOption) {
    this.key = option.key;
    this.storage = option.storage;
    this.storage.get(option.key).subscribe(unkonw => {
      const v = unkonw as PageOption;
      if (!v) {
        this.limit = 10;
        this.index = 1;
        this.updateStorage();
      } else {
        this.limit = v.limit;
        this.index = v.index;
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
   * 更新状态属性
   */
  updateStatus(): void {
    const data = this.value.filter(v => !v.disabled);
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
    this.value.filter(v => !v.disabled).forEach(v => this.setCheckedIds(v._id, checked));
    this.updateStatus();
  }

  updateStorage(): void {
    this.storage
      .set(this.key, <PageOption>{
        limit: this.limit,
        index: this.index
      })
      .subscribe(() => {});
  }

  refresh(): void {
    this.index = 1;
    this.storage.delete(this.key).subscribe(() => {});
  }

  bind(api: WpxApi, refresh: boolean): Observable<PageData<T>> {
    this.loading = true;
    if (refresh) {
      this.refresh();
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
}
