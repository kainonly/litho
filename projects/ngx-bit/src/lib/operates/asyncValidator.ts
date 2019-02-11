import {Observable} from 'rxjs';

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
