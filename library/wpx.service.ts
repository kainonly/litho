import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentTypeOption, UploadOption, Value } from './types';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传类型
   */
  upload: AsyncSubject<UploadOption> = new AsyncSubject<UploadOption>();
  /**
   * 自定义页面
   */
  scopes: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();
  /**
   * 自定义组件
   */
  components: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();

  scripts: Map<string, AsyncSubject<void>> = new Map();

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  /**
   * 设置静态资源
   * @param url
   */
  setAssets(url: string): void {
    this.assets = url;
  }

  /**
   * 设置上传配置
   * @param option
   */
  setUpload(option: UploadOption): void {
    this.upload.next(option);
    this.upload.complete();
  }

  /**
   * 设置自定义页面
   * @param key 唯一标识
   * @param name 名称
   * @param component 组件
   */
  setScope<T>(key: string, name: string, component: ComponentType<T>): void {
    this.scopes.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }

  /**
   * 设置自定义组件
   * @param key 唯一标识
   * @param name 名称
   * @param component 组件
   */
  setComponent<T>(key: string, name: string, component: ComponentType<T>): void {
    this.components.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }

  /**
   * 建立脚本
   * @param url
   * @private
   */
  private createScript(url: string): HTMLScriptElement {
    const script = this.document.createElement('script');
    script.src = url;
    script.async = true;
    this.document.head.append(script);
    return script;
  }

  /**
   * 异步加载脚本
   * @param key 唯一命名
   * @param url 地址
   * @param plugins 插件地址
   */
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
    fromEvent(script, 'load').subscribe(() => {
      async.next();
      async.complete();
    });
  }

  /**
   * @deprecated
   * 对象存储预签名
   */
  cosPresigned(): Observable<any> {
    return this.http.get(`tencent/cos-presigned`);
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

  /**
   * 获取动态配置
   * @param keys
   */
  getValues(keys?: string[]): Observable<any> {
    const params = new HttpParams();
    if (keys) {
      params.set('keys', keys.join(','));
    }
    return this.http.get('values', { params });
  }

  /**
   * 设置动态配置
   * @param data 配置
   */
  setValues(data: Record<string, any>): Observable<any> {
    return this.http.patch('values', { data });
  }

  /**
   * 删除动态配置
   * @param key 配置键名
   */
  deleteValue(key: string): Observable<any> {
    return this.http.delete(`values/${key}`);
  }

  /**
   * 获取引用枚举
   * @param model
   * @param target
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
}
