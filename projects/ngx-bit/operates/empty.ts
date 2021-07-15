export function empty(value: unknown): boolean {
  if (typeof value === 'object') {
    return Object.keys(<Record<string, unknown>>value).length === 0;
  }
  return ['', 0, false, null, undefined].includes(<string | number | boolean | null | undefined>value);
}
