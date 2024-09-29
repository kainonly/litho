import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Optional, signal } from '@angular/core';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Any, BasicDto, R, Search, SetUserDto, UnsetUserKey } from '@common';
import { User } from '@common/models/user';
import { Api } from '@common/utils/api';
import { List } from '@common/utils/list';
import { Model } from '@common/utils/model';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  activeUser = signal<Any | null>(null);

  private refreshTokenSubscription?: Subscription;

  constructor(
    @Optional() private http: HttpClient,
    @Optional() private storage: StorageMap,
    @Optional() private modal: NzModalService
  ) {}

  setList<T extends BasicDto>(api: Api<T>, pagesize = 50): List<T> {
    return new List<T>(api, pagesize);
  }

  setModel<T extends BasicDto, S extends Search>(key: string, api: Api<T>, search: S): Model<T, S> {
    return new Model<T, S>(`models:${key}`, this.storage, api, search);
  }

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

  autoRefreshToken(): void {
    this.stopRefreshToken();
    this.refreshTokenSubscription = timer(0, 3200 * 1000)
      .pipe(
        switchMap(() => this.http.get<{ code: string }>('refresh_code')),
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

  getUser(): Observable<User> {
    return this.http.get<User>('user').pipe(
      map(v => {
        this.activeUser.set(v);
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

  getTotp(): Observable<R> {
    return this.http.get(`user/totp`);
  }

  setUserTotp(totp: string, tss: string[]): Observable<R> {
    return this.http.post(`user/totp`, { totp, tss });
  }

  unsetUser(key: UnsetUserKey): Observable<R> {
    return this.http.delete(`user/${key}`);
  }
}
