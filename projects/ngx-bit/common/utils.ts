import { SearchOption } from '../types';

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
