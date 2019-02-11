import {isArray, isObject} from 'util';

export function emptyObject(object: any): boolean {
  if (isObject(object) && !isArray(object)) {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}
