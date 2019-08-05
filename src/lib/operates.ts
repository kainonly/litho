import {Observable} from 'rxjs';
import {isArray, isObject} from 'util';

export const operates = {
  /**
   * form control async validator
   */
  asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any> {
    return Observable.create((observer) => {
      setTimeout(() => {
        req.subscribe((res) => {
          if (!res.error) {
            if (res.data) {
              observer.next({error: true, [field]: true});
            } else {
              observer.next(null);
            }
          } else {
            observer.next({error: true});
          }
          observer.complete();
        });
      }, 1000);
    });
  },
  emptyArray(array: any[]) {
    if (isArray(array)) {
      return array.length === 0;
    } else {
      return false;
    }
  },
  emptyObject(object: any): boolean {
    if (isObject(object) && !isArray(object)) {
      return Object.keys(object).length === 0;
    } else {
      return false;
    }
  },
  objectToArray(object: any): any[] {
    if (isObject(object) && !isArray(object)) {
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
  },
  objectToMap(object: any): Map<any, any> | boolean {
    if (isObject(object) && !isArray(object)) {
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
  }
};
