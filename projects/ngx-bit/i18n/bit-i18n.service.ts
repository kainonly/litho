import { Injectable, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Config } from './config';
import { Locale } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitI18nService {
  readonly locales!: Locale[];
  readonly ids!: string[];

  constructor(private config: Config, @Optional() private fb: FormBuilder) {
    this.locales = config.locales;
    this.ids = this.locales.map(v => v.id);
  }

  /**
   * 创建国际化 group
   */
  group(options?: Record<string, any[]>): FormGroup {
    const controls: Record<string, any[]> = {};
    this.locales.forEach(value => {
      if (options?.hasOwnProperty(value.id)) {
        controls[value.id] = options[value.id];
      } else {
        controls[value.id] = new Array(3).fill(null);
      }
    });
    return this.fb.group(controls);
  }

  /**
   * 国际化数据转化
   */
  parse(value: string): Record<string, any> {
    const data: Record<string, any> = JSON.parse(value);
    Object.keys(data).forEach(id => {
      if (!this.ids.includes(id)) {
        Reflect.deleteProperty(data, id);
      }
    });
    return data;
  }
}
