import {Observable} from 'rxjs';

/**
 * form control async validator
 */
export const asyncValidator = (req: Observable<any>, field = 'duplicated'): Observable<any> => {
  return new Observable(subscriber => {
    setTimeout(() => {
      req.subscribe((res) => {
        if (!res.error) {
          if (res.data) {
            subscriber.next({error: true, [field]: true});
          } else {
            subscriber.next(null);
          }
        } else {
          subscriber.next({error: true});
        }
        subscriber.complete();
      });
    }, 1000);
  });
};


export const emptyArray = (array: any[]) => {
  return Array.isArray(array) ? array.length === 0 : false;
};

export const emptyObject = (object: any): boolean => {
  return (object !== null && typeof object === 'object' && !Array.isArray(object)) ?
    Object.keys(object).length === 0 : false;
};


export const objectToArray = (object: any): any[] => {
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
};

export const objectToMap = (object: any): Map<any, any> | boolean => {
  if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
    const mapList: Map<any, any> = new Map();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        mapList.set(key, object[key]);
      }
    }
    return mapList;
  } else {
    return false;
  }
};
