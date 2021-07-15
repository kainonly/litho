import { Observable } from 'rxjs';

import { SearchOption } from '../types';
import { TemplateRef } from '@angular/core';

/**
 * 返回查询数组
 */
export function getQuerySchema(options: SearchOption[]): unknown[] {
  const schema = [];
  for (const search of options) {
    if (typeof search.value === 'object' && Object.keys(<Record<string, unknown>>search.value).length === 0) {
      continue;
    }
    if (typeof search.value === 'string') {
      search.value = search.value.trim();
    }
    const exclude = search.exclude ?? ['', 0, null];
    if (!exclude.includes(search.value)) {
      let value = search.value;
      switch (search.op) {
        case 'like':
          value = `%${value}%`;
          break;
      }
      switch (search.format) {
        case 'unixtime':
          if (Array.isArray(value)) {
            value = value.map(v => Math.trunc((<Date>v).getTime() / 1000));
          } else {
            value = Math.trunc((<Date>value).getTime() / 1000);
          }
          break;
      }
      schema.push([search.field, search.op, value]);
    }
  }
  return schema;
}

/**
 * 加载脚本
 */
export function loadScript(doc: Document, url: string): Observable<boolean> {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  doc.body.appendChild(script);
  return new Observable<boolean>(observer => {
    script.onload = () => {
      observer.next(true);
      observer.complete();
    };
  });
}
