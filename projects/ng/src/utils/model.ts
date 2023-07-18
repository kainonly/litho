import { BasicDto } from '../types';

export class WpxModel<T extends BasicDto> {
  data: T[] = [];
  page = 1;
  pagesize = 10;
  total = 0;

  checked = false;
  indeterminate = false;
  selection: Map<string, T> = new Map<string, T>();

  set(data: T[]): void {
    this.data = [...data];
  }

  append(data: T[]): void {
    this.data = [...this.data, ...data];
  }

  clear(): void {
    this.data = [];
    this.page = 1;
    this.total = 0;
  }

  setSelection(data: T): void {
    this.selection.set(data._id, data);
    this.updateChange();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateChange();
  }

  setCurrentSelection(checked: boolean): void {
    this.data.filter(v => !v['_disabled']).forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v._id)));
    this.updateChange();
  }

  clearSelection(): void {
    this.checked = false;
    this.indeterminate = false;
    this.selection.clear();
  }

  private updateChange(): void {
    const data = this.data.filter(v => !v['_disabled']);
    this.checked = data.every(v => this.selection.has(v._id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v._id)) : false;
  }
}
