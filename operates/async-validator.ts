import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any> {
  return timer(500).pipe(
    switchMap(() => req),
    map(res => {
      if (!res.error) {
        return res.data ? { error: true, [field]: true } : null;
      } else {
        return { error: true, [field]: true };
      }
    })
  );
}
