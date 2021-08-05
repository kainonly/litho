import { Injectable, Optional } from '@angular/core';

import { Config } from './config';
import { Locale } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitI18nService {
  readonly locales!: Locale[];

  constructor(private config: Config) {
    this.locales = config.locales;
  }

  /**
   * 创建国际化 controls
   */
  controls(options?: Record<string, any[]>): Record<string, any[]> {
    const controls: Record<string, any[]> = {};
    this.locales.forEach(value => {
      if (options?.hasOwnProperty(value.id)) {
        controls[value.id] = options[value.id];
      } else {
        controls[value.id] = new Array(3).fill(null);
      }
    });
    return controls;
  }

  /**
   * 国际化数据转化
   */
  parse(value: string): Record<string, any> {
    const data: Record<string, any> = JSON.parse(value);
    for (const locale of Object(data).keys) {
      if (!this.locales.includes(locale)) {
        Reflect.deleteProperty(data, locale);
      }
    }
    return data;
  }
}
