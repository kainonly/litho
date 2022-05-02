import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageInfoDto } from './types';

@Injectable({ providedIn: 'root' })
export class FeishuService {
  constructor(private http: HttpClient) {}

  /**
   * 获取飞书授权 URL
   */
  oauth(action?: string): Observable<string> {
    const state = JSON.stringify({
      action
    });
    return this.http.get<any>('feishu/option').pipe(
      map(v => {
        const redirect_uri = encodeURIComponent(v.redirect);
        return `${v.url}?redirect_uri=${redirect_uri}&app_id=${v.app_id}&state=${state}`;
      })
    );
  }
}
