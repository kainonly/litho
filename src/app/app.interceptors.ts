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
    let option = {
      url: req.url,
      withCredentials: false
    };
    if (!regex.test(req.url)) {
      option = {
        url: `${environment.baseUrl}/${req.url}`,
        withCredentials: true
      };
    }
    const request = req.clone({
      ...req,
      ...option
    });
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
            this.message.error(`Your login failed, please confirm whether the account password is correct`);
            break;
          case 'AUTH_MANY_INCORRECT':
            this.message.error(`You have failed to log in too many times, please try again later`);
            break;
          default:
            this.message.error(`Failed [${e.error.code}] ${e.error.message}`);
        }
        break;
      case 401:
        this.message.error(`Authentication has expired, please log in again`);
        this.router.navigateByUrl('/login');
        break;
      case 403:
        this.message.error(`Access is disabled, please contact the administrator`);
        break;
      case 500:
      case 503:
        this.message.error(`The server is running abnormally`);
        break;
    }
    return throwError(() => e);
  };
}
