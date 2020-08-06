import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { factoryLocales } from '../operates/factory-locales';
import { BitConfig, I18nOption } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BitConfigService implements BitConfig {
  url: {
    api: string;
    static: string;
    icon?: string
  };
  api: {
    namespace: string;
    upload: string;
    withCredentials: boolean
  };
  col: {
    [p: string]: any
  };
  i18n: {
    default: string;
    contain: string[];
    switch: I18nOption[]
  };
  locale: {
    default: string;
    mapping: Map<number, string>
    bind: Map<string, any>
  };
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
  setupLocales(packer: Promise<any>) {
    packer.then(result => {
      this.lang = factoryLocales(result.default, this.locale.mapping);
    });
  }

  /**
   * Get a language
   */
  getLang(locale: string) {
    return this.lang[locale];
  }

  /**
   * Set up request interceptor
   */
  setupHttpInterceptor(operate: OperatorFunction<any, any>) {
    this.httpInterceptor = operate;
  }

  /**
   * Get request interceptor
   */
  getHttpInterceptor() {
    return this.httpInterceptor;
  }
}
