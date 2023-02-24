import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project, SetUserDto, UnsetUserDto, User } from '@common/types';
import { AnyDto, UploadOption, WpxService } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  project?: AnyDto<Project>;
  user?: AnyDto<User>;

  constructor(private http: HttpClient, private wpx: WpxService, @Inject(LOCALE_ID) private locale: string) {}

  ping(): Observable<any> {
    return this.http.get('');
  }

  login(data: { identity: string; password: string }): Observable<any> {
    return this.http.post('login', data);
  }

  verify(): Observable<HttpResponse<any>> {
    return this.http.get('verify', { observe: 'response' });
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>('code').pipe(
      switchMap(v =>
        this.http.post('refresh_token', {
          code: v.code
        })
      )
    );
  }

  logout(): Observable<any> {
    return this.http.post('logout', {});
  }

  getUpload(): Observable<UploadOption> {
    return this.http
      .get<UploadOption>('options', {
        params: { type: 'upload' }
      })
      .pipe(
        map(v => {
          this.wpx.setUpload(v);
          return v;
        })
      );
  }

  oauth(action?: string): Observable<string> {
    const state = JSON.stringify({
      action,
      locale: this.locale
    });
    return this.http
      .get<any>('options', {
        params: { type: 'collaboration' }
      })
      .pipe(
        map(v => {
          const redirect_uri = encodeURIComponent(v.redirect);
          return `${v.url}?redirect_uri=${redirect_uri}&app_id=${v.app_id}&state=${state}`;
        })
      );
  }

  getUser(): Observable<AnyDto<User>> {
    return this.http.get<AnyDto<User>>('user').pipe(
      map(v => {
        this.user = v;
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

  resetUser(data: any): Observable<any> {
    return this.http.post('user/reset', data);
  }

  getValues(keys?: string[]): Observable<any> {
    const params = new HttpParams();
    if (keys) {
      params.set('keys', keys.join(','));
    }
    return this.http.get('values', { params });
  }

  setValues(data: Record<string, any>): Observable<any> {
    return this.http.post('values', data);
  }

  deleteValue(key: string): Observable<any> {
    return this.http.delete(`values/${key}`);
  }
}
