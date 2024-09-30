import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { EXTERNAL } from '@common';
import { NzMessageService } from 'ng-zorro-antd/message';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(EXTERNAL)) {
    return next(req);
  }
  const router = inject(Router);
  const message = inject(NzMessageService);
  return next(
    req.clone({
      ...req,
      ...{
        url: `api/${req.url}`
      }
    })
  ).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        // TODO: RBAC Code...
      }
    }),
    catchError(e => {
      switch (e.status) {
        case 400:
          switch (e.error.code) {
            default:
              message.error(`Failed [${e.error.code}]：${e.error.msg}`);
          }
          break;
        case 401:
          message.error(`Authentication has expired, please log in again`);
          router.navigateByUrl('/login');
          break;
        case 403:
          message.error(`Access is disabled, please contact the administrator`);
          break;
        case 500:
        case 503:
          message.error(`The server is running abnormally`);
          break;
      }
      return throwError(() => e);
    })
  );
}
