import { Platform } from '@angular/cdk/platform';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentTypeOption, R, TransactionResult, UploadOption, Value } from './types';

@Injectable({ providedIn: 'root' })
export class WpxService {
  assets = '/assets';
  upload: AsyncSubject<UploadOption> = new AsyncSubject<UploadOption>();
  scopes: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();
  components: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();
  scripts: Map<string, AsyncSubject<void>> = new Map();

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private platform: Platform) {}

  setAssets(url: string): void {
    this.assets = url;
  }

  setUpload(option: UploadOption): void {
    this.upload.next(option);
    this.upload.complete();
  }

  setScope<T>(key: string, name: string, component: ComponentType<T>): void {
    this.scopes.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }

  setComponent<T>(key: string, name: string, component: ComponentType<T>): void {
    this.components.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }

  private createScript(url: string): HTMLScriptElement | void {
    if (!this.platform.isBrowser) {
      return;
    }
    const script = this.document.createElement('script');
    script.src = url;
    script.async = true;
    this.document.head.append(script);
    return script;
  }

  loadScript(key: string, url: string, plugins: string[]): void {
    if (this.scripts.has(key)) {
      return;
    }
    const script = this.createScript(url);
    const async: AsyncSubject<void> = new AsyncSubject();
    this.scripts.set(key, async);
    for (const plugin of plugins) {
      this.createScript(plugin);
    }
    if (script) {
      fromEvent(script, 'load').subscribe(() => {
        async.next();
        async.complete();
      });
    }
  }

  setLocale(id: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const l = this.document.location;
    this.document.location = `${l.origin}/${id}/${l.hash}`;
  }

  cosPresigned(): Observable<any> {
    return this.http.get(`tencent/cos_presigned`);
  }

  /**
   * @deprecated
   * 获取密码重置验证码
   */
  getCaptcha(email: string): Observable<any> {
    return this.http.get('captcha', { params: { email } });
  }

  /**
   * @deprecated
   * 验证密码重置验证码
   */
  verifyCaptcha(data: any): Observable<any> {
    return this.http.post('captcha', data);
  }

  getValues(keys?: string[]): Observable<any> {
    const params = new HttpParams();
    if (keys) {
      params.set('keys', keys.join(','));
    }
    return this.http.get('values', { params });
  }

  setValues(data: Record<string, any>): Observable<any> {
    return this.http.patch('values', { data });
  }

  deleteValue(key: string): Observable<any> {
    return this.http.delete(`values/${key}`);
  }

  /**
   * @deprecated
   */
  getRefValues(model: string, target: string): Observable<Value[]> {
    return this.http.get<any[]>(model).pipe(
      map<any[], Value[]>(v =>
        v.map(v => ({
          label: v[target] ?? `ID[${v._id}]`,
          value: v._id
        }))
      )
    );
  }

  transaction(): Observable<TransactionResult> {
    return this.http.post<TransactionResult>('/transaction', {});
  }

  commit(txn: string): Observable<R> {
    return this.http.post('/commit', { txn });
  }
}
