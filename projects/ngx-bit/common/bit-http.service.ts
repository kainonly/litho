import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

import { BitConfig } from './bit-config';

@Injectable({ providedIn: 'root' })
export class BitHttpService {
  /**
   * 基础路径
   * base URL
   */
  readonly baseUri: string;
  /**
   * 是否同源
   */
  readonly withCredentials: boolean;
  /**
   * 请求拦截器
   * Http interceptor
   */
  private interceptor?: OperatorFunction<unknown, unknown>;

  constructor(bitConfig: BitConfig, private http: HttpClient) {
    this.baseUri = `${bitConfig.url.api + bitConfig.api.namespace}/`;
    this.withCredentials = bitConfig.api.withCredentials;
  }

  /**
   * 设置请求拦截器
   * Http interceptor
   */
  setupInterceptor(operate: OperatorFunction<unknown, unknown>): void {
    this.interceptor = operate;
  }

  /**
   * 发起请求客户端
   * Http client
   */
  req(url: string, body: Record<string, unknown> = {}, method = 'post'): Observable<Record<string, unknown>> {
    let httpClient = this.http.request(method, this.baseUri + url, {
      body,
      withCredentials: this.withCredentials
    });
    if (this.interceptor) {
      httpClient = httpClient.pipe(this.interceptor);
    }
    return httpClient;
  }
}
