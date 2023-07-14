import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AppInterceptors implements HttpInterceptor {
  constructor(
    private router: Router,
    private message: NzMessageService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const regex = new RegExp('^http(|s)://');
    let update: {
      withCredentials?: boolean;
      url?: string;
    };
    if (!regex.test(req.url)) {
      update = {
        url: `${environment.baseUrl}/${req.url}`,
        withCredentials: true
      };
    } else {
      update = { url: req.url };
    }
    const request = req.clone(update);

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // TODO: RBAC Code...
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError = (e: HttpErrorResponse): Observable<never> => {
    switch (e.status) {
      case 400:
        switch (e.error.code) {
          case 'AUTH_INCORRECT':
            this.message.error(`您的登录失败，请确实账户口令是否正确`);
            break;
          case 'AUTH_MANY_INCORRECT':
            this.message.error(`您登录失败的次数过多，请稍后再试`);
            break;
          default:
            this.message.error(`操作失败 [${e.error.code}] ${e.error.message}`);
        }
        break;
      case 401:
        this.message.error(`认证已失效，请重新登录`);
        this.router.navigateByUrl('/login');
        break;
      case 403:
        this.message.error(`访问权限被禁用，请联系管理员`);
        break;
      case 500:
      case 503:
        this.message.error(`服务器运行异常`);
        break;
    }
    return throwError(() => e);
  };
}
