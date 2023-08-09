import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@common/models/user';
import { CollaborationOption, LoginDto, SetUserDto, UnsetUserKey } from '@common/types';
import { Any, AnyDto, R, UploadOption } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  user = signal<AnyDto<User> | null>(null);
  private refreshTokenSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ping(): Observable<R> {
    return this.http.get('');
  }

  login(email: string, password: string): Observable<R> {
    return this.http.post('login', { email, password });
  }

  loginTotp(email: string, code: string): Observable<R> {
    return this.http.post('login/totp', { email, code });
  }

  verify(): Observable<HttpResponse<R>> {
    return this.http.get('verify', { observe: 'response' });
  }

  code(): Observable<{ code: string }> {
    return this.http.get<{ code: string }>('code');
  }

  refresh_token(code: string): Observable<R> {
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

  logout(): Observable<R> {
    return this.http.post('logout', {});
  }

  getUploadOption(): Observable<UploadOption> {
    return this.http.get<UploadOption>('options', {
      params: { type: 'upload' }
    });
  }

  getCollaborationOption(): Observable<CollaborationOption> {
    return this.http.get<CollaborationOption>('options', {
      params: { type: 'collaboration' }
    });
  }

  oauth(action?: string): Observable<string> {
    const state = JSON.stringify({ action, locale: this.locale });
    return this.getCollaborationOption().pipe(
      map(v => {
        const redirect_uri = encodeURIComponent(v.redirect);
        return `${v.url}?redirect_uri=${redirect_uri}&app_id=${v.app_id}&state=${state}`;
      })
    );
  }

  getUser(): Observable<AnyDto<User>> {
    return this.http.get<AnyDto<User>>('user').pipe(
      map(v => {
        this.user.set(v);
        return v;
      })
    );
  }

  setUser(data: SetUserDto): Observable<R> {
    return this.http.patch('user', data);
  }

  setUserPassword(old: string, password: string): Observable<R> {
    return this.http.post(`user/password`, { old, password });
  }

  setUserPhone(phone: string, code: string): Observable<R> {
    return this.http.post(`user/phone`, { phone, code });
  }

  getTotp(): Observable<R> {
    return this.http.get(`user/totp`);
  }

  setUserTotp(totp: string, tss: string[]): Observable<R> {
    return this.http.post(`user/totp`, { totp, tss });
  }

  unsetUser(key: UnsetUserKey): Observable<R> {
    return this.http.delete(`user/${key}`);
  }

  generateSecret(): Observable<Any> {
    return this.http.get('options', {
      params: { type: 'generate-secret' }
    });
  }
}
