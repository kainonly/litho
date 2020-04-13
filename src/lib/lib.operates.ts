import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as AjvFactory from 'ajv';
import {Ajv} from 'ajv';

/**
 * form control async validator
 */
export const asyncValidator = (req: Observable<any>, field = 'duplicated'): Observable<any> => {
  return timer(500).pipe(
    switchMap(() => req),
    map(res => {
      if (!res.error) {
        return res.data ? {error: true, [field]: true} : null;
      } else {
        return {error: true, [field]: true};
      }
    })
  );
};

/**
 * json schema validate
 */
export const validate = (schema: string | boolean | object, data: any): any => {
  const ajv: Ajv = new AjvFactory();
  const valid = ajv.validate(schema, data);
  return {
    error: !valid,
    msg: ajv.errorsText()
  };
}

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
