import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Global } from '@shared';

export const appGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const global = inject(Global);
  return global.verify().pipe(
    map(response => {
      if (!response.ok) {
        router.navigateByUrl('/login');
      }
      return true;
    })
  );
};
