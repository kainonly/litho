import { signal } from '@angular/core';

export class Loading {
  value = signal(false);

  constructor(private delay = 800) {}

  start(): void {
    this.value.set(true);
  }

  end(): void {
    setTimeout(() => {
      this.value.set(false);
    }, this.delay);
  }
}
