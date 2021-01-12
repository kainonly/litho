import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { ApiConfig, BitConfig, ColConfig, CurdConfig, I18nConfig, LocaleConfig, UrlConfig } from 'ngx-bit/types';
import { factoryLocales } from 'ngx-bit/operates';

@Injectable({
  providedIn: 'root'
})
export class BitConfigService implements BitConfig {
  url: UrlConfig;
  api: ApiConfig;
  col: ColConfig;
  curd: CurdConfig;
  i18n: I18nConfig;
  locale: LocaleConfig;
  page: number;

  /**
   * Common language packer
   */
  private lang: any = {};
  /**
   * request interceptor
   */
  private httpInterceptor: OperatorFunction<any, any>;

  /**
   * Setup common language pack
   */
  setupLocales(packer: object | Promise<any>): void {
    Promise.resolve(packer).then(result => {
      this.lang = factoryLocales(result.default, this.locale.mapping);
    });
  }

  /**
   * Get a language
   */
  getLang(locale: string): any {
    return this.lang[locale];
  }

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
