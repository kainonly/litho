import { CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';

export const appGuard: CanActivateFn = (): Observable<boolean> => {
  // const router = inject(Router);
  // const global = inject(Global);
  // return global.verify().pipe(
  //   map(response => {
  //     if (!response.ok) {
  //       router.navigateByUrl('/login');
  //     }
  //     return true;
  //   })
  // );
  return of(true);
};
