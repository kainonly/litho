import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) {}

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
}
