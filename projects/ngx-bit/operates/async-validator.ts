import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function asyncValidator(handle: Observable<boolean>, field = 'duplicated', dueTime = 500): Observable<any> {
  return timer(dueTime).pipe(
    switchMap(() => handle),
    map(result => {
      return !result ? { error: true, [field]: true } : null;
    })
  );
}
