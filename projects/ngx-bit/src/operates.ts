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

export function getId(route: ActivatedRoute): Observable<any> {
  return route.params.pipe(map(params => params.id));
}

export function emptyObject(object: any) {
  if (typeof object === 'object') {
    return Object.keys(object).length === 0;
  } else {
    return false;
  }
}
