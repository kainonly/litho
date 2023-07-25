import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@common/models/user';
import { SetUserDto, UnsetUserDto } from '@common/types';
import { AnyDto } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  user = signal<AnyDto<User> | null>(null);
  private refreshTokenSubscription?: Subscription;

  constructor(private http: HttpClient) {}

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

  getUser(): Observable<AnyDto<User>> {
    return this.http.get<AnyDto<User>>('user').pipe(
      map(v => {
        this.user.set(v);
        return v;
      })
    );
  }

  setUser(data: SetUserDto): Observable<any> {
    return this.http.post('user', data);
  }

  unsetUser(data: UnsetUserDto): Observable<any> {
    return this.http.delete(`user/${data}`);
  }
}
