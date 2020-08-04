export function emptyArray(array: any[]) {
  return Array.isArray(array) ? array.length === 0 : false;
}
