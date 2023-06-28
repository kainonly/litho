import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, Subscription, switchMap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private refreshTokenSubscription?: Subscription;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) {}

  ping(): Observable<any> {
    return this.http.get('');
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post('login', data);
  }

  verify(): Observable<HttpResponse<any>> {
    return this.http.get('verify', { observe: 'response' });
  }

  code(): Observable<any> {
    return this.http.get('code');
  }

  refresh_token(code: string): Observable<any> {
    return this.http.post('refresh_token', {
      code
    });
  }

  autoRefreshToken(): void {
    this.stopRefreshToken();
    this.refreshTokenSubscription = timer(0, 3200 * 1000)
      .pipe(
        switchMap(() => this.code()),
        switchMap(v =>
          this.http.post('refresh_token', {
            code: v.code
          })
        )
      )
      .subscribe(() => {
        console.debug('refresh_token');
      });
  }

  stopRefreshToken(): void {
    this.refreshTokenSubscription?.unsubscribe();
  }

  logout(): Observable<any> {
    return this.http.post('logout', {});
  }
}
