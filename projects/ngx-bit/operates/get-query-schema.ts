import { SearchOption } from 'ngx-bit/types';

export function getQuerySchema(options: SearchOption[]): any[] {
  const schema = [];
  for (const search of options) {
    if (
      search.value !== null &&
      typeof search.value === 'object' &&
      Object.keys(search.value).length === 0
    ) {
      continue;
    }
    if (typeof search.value === 'string') {
      search.value = search.value.trim();
    }
    const exclude = search.exclude ? search.exclude : ['', 0, null];
    if (!exclude.includes(search.value)) {
      const value = search.op === 'like' ? `%${search.value}%` : search.value;
      schema.push([search.field, search.op, value]);
    }
  }
  return schema;
}
