import {Observable} from 'rxjs';

export const operates = {
  /**
   * form control async validator
   */
  asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any> {
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
  },
  emptyArray(array: any[]) {
    if (Array.isArray(array)) {
      return array.length === 0;
    } else {
      return false;
    }
  },
  emptyObject(object: any): boolean {
    if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
      return Object.keys(object).length === 0;
    } else {
      return false;
    }
  },
  objectToArray(object: any): any[] {
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
  },
  objectToMap(object: any): Map<any, any> | boolean {
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
  }
};
