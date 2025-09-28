import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, Observable, throwError } from 'rxjs';

import { EXTERNAL } from '@shared';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(EXTERNAL)) {
    return next(req);
  }
  const router = inject(Router);
  const message = inject(NzMessageService);
  const modal = inject(NzModalService);

  return next(
    req.clone({
      ...req,
      ...{
        url: `apis/${req.url}`
      }
    })
  ).pipe(
    catchError(e => {
      switch (e.status) {
        case 401:
          modal.closeAll();
          message.error(`Login expired. Please re-log in.`);
          router.navigateByUrl('/login').then();
          break;
        case 403:
          message.error(`Have no permission to access.`);
          break;
        case 500:
        case 503:
          if (![''].includes(e.error.code)) {
            message.error(`Server busy. Please try again later.`);
          }
          break;
      }
      return throwError(() => e);
    })
  );
}
