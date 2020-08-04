export function objectToArray(object: any): any[] {
  if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
    const array = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        array.push({
          key,
          rows: object[key]
        });
      }
    }
    return array;
  } else {
    return [];
  }
}
