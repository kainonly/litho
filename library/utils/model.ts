import { AnyDto, ApiOptions, BasicDto, Filter, XFilter } from '../types';

export class WpxModel<T extends BasicDto> implements ApiOptions<T> {
  filter: Filter<T> = {};
  keys?: Array<keyof AnyDto<T>>;
  sort: Map<keyof AnyDto<T>, -1 | 1> = new Map();
  xfilter?: Record<string, XFilter>;
  loading = true;
  total = 0;
  values: T[] = [];
  page = 1;
  pagesize = 10;
  readonly checkedIds: Set<string> = new Set<string>();
  checked = false;
  indeterminate = false;
  checkedNumber = 0;

  set(values: T[]): void {
    this.values = [...values];
  }

  reset(): void {
    this.page = 1;
  }

  setCheckedIds(id: string, checked: boolean): void {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  setChecked(id: string, checked: boolean): void {
    this.setCheckedIds(id, checked);
    this.updateCheckedStatus();
  }

  setNChecked(checked: boolean): void {
    this.values.filter(v => !v['_disabled']).forEach(v => this.setCheckedIds(v._id!, checked));
    this.updateCheckedStatus();
  }

  updateCheckedStatus(): void {
    const data = this.values.filter(v => !v['_disabled']);
    this.checked = data.every(v => this.checkedIds.has(v._id!));
    this.indeterminate = data.some(v => this.checkedIds.has(v._id!)) && !this.checked;
    this.checkedNumber = this.checkedIds.size;
  }

  clearChecked(): void {
    this.checked = false;
    this.indeterminate = false;
    this.checkedIds.clear();
    this.checkedNumber = 0;
  }
}
