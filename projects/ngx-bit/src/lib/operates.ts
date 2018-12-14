import {Observable} from 'rxjs';
import {isArray, isObject} from 'util';

export function asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any> {
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
}

export function i18nControlsValue(i18n: string, value?: any): string {
  if (!value) {
    return null;
  }
  if (value[i18n] !== undefined) {
    return value[i18n];
  } else {
    return null;
  }
}

export function i18nControlsValidate(i18n: string, validate?: any): any[] {
  if (!validate) {
    return [];
  }
  if (validate[i18n] !== undefined) {
    return [validate[i18n]];
  } else {
    return [];
  }
}

export function i18nControlsAsyncValidate(i18n: string, asyncValidate?: any): any[] {
  if (!asyncValidate) {
    return [];
  }
  if (asyncValidate[i18n] !== undefined) {
    return [asyncValidate[i18n]];
  } else {
    return [];
  }
}

export function factoryLocales(packer: any): any {
  const source = {
    zh_cn: {},
    en_us: {}
  };
  for (const i in packer) {
    if (packer.hasOwnProperty(i)) {
      source.zh_cn[i] = packer[i][0];
      source.en_us[i] = packer[i][1];
    }
  }
  return source;
}

export function getRouteName(url: string, start = '%7B', end = '%7D'): string {
  const reg1 = new RegExp(`(?:${start})(.+?)(?=${end})`, 'g');
  return url.match(reg1)[0].replace(start, '');
}

export function emptyObject(object: any): boolean {
  if (isObject(object) && !isArray(object)) {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}

export function emptyArray(array: any[]) {
  if (isArray(array)) {
    return array.length === 0;
  } else {
    return false;
  }
}

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

export function objectToMap(object: any): Map<any, any> | boolean {
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
