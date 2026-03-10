import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Global } from '@shared';

export const appGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const global = inject(Global);
  return global.verify().pipe(
    tap(response => {
      if (!response.ok) {
        global.activeUser.set(null);
        router.navigateByUrl('/login');
      }
    }),
    switchMap(() => global.getUser()),
    map(() => true)
  );
};
