import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {
  private refreshTokenSubscription?: Subscription;

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient) {}

  ping(): Observable<any> {
    return this.http.get('');
  }

  login(data: { identity: string; password: string }): Observable<any> {
    return this.http.post('login', data);
  }

  verify(): Observable<boolean> {
    return this.http.get('verify', { observe: 'response' }).pipe(map(v => v.status === 200));
  }

  autoRefreshToken(): void {
    this.stopRefreshToken();
    this.refreshTokenSubscription = timer(0, 3200 * 1000)
      .pipe(
        switchMap(() => this.http.get<any>('code')),
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
    this.stopRefreshToken();
    return this.http.post('logout', {});
  }
}
