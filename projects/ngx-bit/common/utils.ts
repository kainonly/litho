import { SearchOption } from '../types';
import { Observable } from 'rxjs';

/**
 * 返回查询数组
 */
export function getQuerySchema(options: SearchOption[]): any[] {
  const schema = [];
  for (const search of options) {
    if (search.value !== null && typeof search.value === 'object' && Object.keys(search.value).length === 0) {
      continue;
    }
    if (typeof search.value === 'string') {
      search.value = search.value.trim();
    }
    const exclude = search.exclude ? search.exclude : ['', 0, null];
    if (!exclude.includes(search.value)) {
      let value = search.value;
      if (search.op === 'like') {
        value = `%${value}%`;
      }
      if (search.format !== undefined && search.format === 'unixtime') {
        value = Array.isArray(value)
          ? value.map(v => Math.trunc(v.getTime() / 1000))
          : Math.trunc(value.getTime() / 1000);
      }
      schema.push([search.field, search.op, value]);
    }
  }
  return schema;
}

/**
 * 加载脚本
 */
export function loadScript(doc: Document, url: string): Observable<any> {
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
