export function emptyObject(object: object): boolean {
  return (object !== null && typeof object === 'object' && !Array.isArray(object)) ?
    Object.keys(object).length === 0 : false;
}
