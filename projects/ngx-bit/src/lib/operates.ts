import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

export function asyncValidator(is_null: boolean, request: Observable<any>): Observable<any> {
  if (is_null) {
    return Observable.create((observer) => {
      observer.next(null);
      observer.complete();
    });
  } else {
    return request.pipe(
      map(({error}) => {
        if (error) {
          return {error: true, duplicated: true};
        }
      }),
      take(1)
    );
  }
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

export function getId(route: ActivatedRoute): Observable<any> {
  return route.params.pipe(map(params => params.id));
}

export function emptyObject(object: any): boolean {
  if (typeof object === 'object') {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}
