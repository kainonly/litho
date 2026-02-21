import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '@env';
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
        url: `${environment.baseUrl}/${req.url}`,
        withCredentials: true
      }
    })
  ).pipe(
    catchError(e => {
      switch (e.status) {
        case 401:
          modal.closeAll();
          message.error(`登录已过期，请重新登录`);
          router.navigateByUrl('/login').then();
          break;
        case 403:
          message.error(`无权限访问`);
          break;
        case 500:
        case 503:
          if (![''].includes(e.error.code)) {
            message.error(`服务器繁忙，请稍后再试`);
          }
          break;
      }
      return throwError(() => e);
    })
  );
}
