import {isArray} from 'util';

export function emptyArray(array: any[]) {
  if (isArray(array)) {
    return array.length === 0;
  } else {
    return false;
  }
}
