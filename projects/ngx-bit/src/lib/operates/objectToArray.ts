import {isArray, isObject} from 'util';

export function objectToArray(object: any): any[] {
  if (isObject(object) && !isArray(object)) {
    const array = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        array.push({
          key: key,
          rows: object[key]
        });
      }
    }
    return array;
  } else {
    return [];
  }
}
