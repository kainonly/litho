import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FilterConfig {
  height?: number;
  visible?: boolean;
}

export class Filter {
  readonly height = signal(160);
  readonly visible = signal(false);

  constructor(
    public readonly form: FormGroup,
    config: FilterConfig = {}
  ) {
    this.height.set(config.height ?? 160);
    this.visible.set(config.visible ?? false);
  }

  patch(value: Record<string, unknown>): void {
    if (hasMeaningfulValue(value)) {
      this.visible.set(true);
    }
    this.form.patchValue(value);
  }

  reset(): void {
    this.form.reset();
  }

  open(): void {
    this.visible.update(v => !v);
  }

  close(): void {
    this.visible.set(false);
  }
}

const EPOCH_TIME = Date.parse('1970-01-01T00:00:00Z');

function hasMeaningfulValue(value: Record<string, unknown>): boolean {
  return Object.values(value).some(isMeaningfulValue);
}

function isMeaningfulValue(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length !== 0;
  }
  if (value instanceof Date) {
    return value.getTime() === EPOCH_TIME;
  }
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>).length !== 0;
  }
  return Boolean(value);
}
