export class Params {
  private values: Map<string, string[]> = new Map<string, string[]>();

  constructor(params?: Record<string, string | string[]>) {
    const data = params ? Object.entries(params) : [];
    for (const [key, value] of data) {
      this.set(key, value);
    }
  }

  has(name: string): boolean {
    return this.values.has(name);
  }

  get(name: string): string[] {
    return this.values.get(name) ?? [];
  }

  keys(): string[] {
    return [...this.values.keys()];
  }

  set(name: string, value: string | string[]): void {
    this.values.set(name, typeof value === 'string' ? [value] : value);
  }

  append(name: string, value: string | string[]): void {
    const data = this.get(name);
    if (typeof value === 'string') {
      data.push(value);
    } else {
      data.push(...value);
    }
    this.set(name, data);
  }

  delete(name: string): void {
    this.values.delete(name);
  }

  toQuery(): string {
    const data: string[] = [];
    for (const [key, value] of this.values.entries()) {
      value.forEach(v => data.push(`${key}=${v}`));
    }
    return encodeURI(data.join('&'));
  }
}
