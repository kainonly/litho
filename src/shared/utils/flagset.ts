import { signal } from '@angular/core';

/**
 * 基于 Signal 的布尔标记集合，替代 Set<string>，适用于 OnPush 变更检测。
 * 内部使用 Record<string, boolean> 存储，所有操作均返回新对象以触发响应式更新。
 */
export class FlagSet {
  private readonly _state = signal<Record<string, boolean>>({});

  /** 只读 signal，供模板直接绑定 */
  readonly state = this._state.asReadonly();

  /** 判断 key 是否存在 */
  has(key: string): boolean {
    return this._state()[key];
  }

  /** 添加 key */
  add(key: string): void {
    this._state.update(s => ({ ...s, [key]: true }));
  }

  /** 移除 key */
  delete(key: string): void {
    this._state.update(s => {
      const next = { ...s };
      delete next[key];
      return next;
    });
  }

  /** 存在则移除，不存在则添加 */
  toggle(key: string): void {
    this._state.update(s => {
      if (s[key]) {
        const next = { ...s };
        delete next[key];
        return next;
      }
      return { ...s, [key]: true };
    });
  }

  /** 清空所有 key */
  clear(): void {
    this._state.set({});
  }

  /** 用指定 key 数组重置集合 */
  reset(keys: string[]): void {
    const next: Record<string, boolean> = {};
    for (const k of keys) {
      next[k] = true;
    }
    this._state.set(next);
  }
}
