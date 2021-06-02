import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { ApiConfig, BitConfig, ColConfig, CurdConfig, I18nConfig, LocaleConfig, UrlConfig } from './typings';

@Injectable({ providedIn: 'root' })
export class BitConfigService implements BitConfig {
  url: UrlConfig;
  api: ApiConfig;
  col: ColConfig;
  curd: CurdConfig;
  i18n: I18nConfig;
  locale: LocaleConfig;
  page: number;

  /**
   * request interceptor
   */
  private httpInterceptor: OperatorFunction<any, any>;

  /**
   * Set up request interceptor
   */
  setupHttpInterceptor(operate: OperatorFunction<any, any>): void {
    this.httpInterceptor = operate;
  }

  /**
   * Get request interceptor
   */
  getHttpInterceptor(): OperatorFunction<any, any> {
    return this.httpInterceptor;
  }
}
