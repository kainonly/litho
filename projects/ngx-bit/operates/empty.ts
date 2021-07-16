export function empty(value: any): boolean {
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return ['', 0, false, null, undefined].includes(value);
}
