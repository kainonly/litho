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
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@env';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AppInterceptors implements HttpInterceptor {
  constructor(private router: Router, private message: NzMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const regex = new RegExp('^http(|s)://');
    let update: any;
    if (!regex.test(req.url)) {
      update = {
        url: `${environment.baseUrl}/${req.url}`
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
            this.message.error($localize`Login failed, please confirm whether the account password is correct`);
            break;
          case 'AUTH_MANY_INCORRECT':
            this.message.error($localize`You have failed to log in too many times, please try again later`);
            break;
          default:
            this.message.error($localize`Execution failed [${e.error.code}] ${e.error.message}`);
        }
        break;
      case 401:
        this.message.error(`Authentication has expired, please log in again`);
        this.router.navigateByUrl('/login');
        break;
      case 403:
        this.message.error($localize`Access is disabled, please contact administrator`);
        break;
      case 404:
        this.message.error($localize`Access request does not exist`);
        break;
      case 500:
      case 503:
        this.message.error($localize`Request server exception`);
        break;
    }
    return throwError(() => e);
  };
}
