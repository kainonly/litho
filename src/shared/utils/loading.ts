import { signal } from '@angular/core';

export class Loading {
  // 加载状态信号
  readonly value = signal(false);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly delay = 800) {}

  // 立即进入加载态，并取消待执行的结束定时器
  start(): void {
    this.clearTimeout();
    this.value.set(true);
  }

  // 延迟退出加载态，避免闪烁
  end(): void {
    this.clearTimeout();
    if (this.delay <= 0) {
      this.value.set(false);
      return;
    }
    this.timeoutId = setTimeout(() => {
      this.value.set(false);
      this.timeoutId = null;
    }, this.delay);
  }

  // 立即退出加载态并清理定时器
  reset(): void {
    this.clearTimeout();
    this.value.set(false);
  }

  // 清理内部定时器
  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
