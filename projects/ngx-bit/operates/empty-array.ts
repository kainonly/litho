export function emptyArray(array: any[]): boolean {
  return Array.isArray(array) ? array.length === 0 : false;
}
