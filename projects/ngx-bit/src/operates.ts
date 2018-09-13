import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

/**
 * TODO:异步验证
 * @param {boolean} is_null 返回空的条件
 * @param {Observable<any>} request 远程验证地址
 * @returns {Observable<any>}
 */
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

/**
 * TODO:获取ID
 * @param route
 */
export function getId(route: ActivatedRoute): Observable<any> {
  return route.params.pipe(map(params => params.id));
}

/**
 * TODO:空对象
 * @param object
 */
export function emptyObject(object: any) {
  if (typeof object === 'object') {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}
