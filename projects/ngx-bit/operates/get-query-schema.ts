import { SearchOption } from 'ngx-bit/types';
import Ajv from 'ajv';

export function getQuerySchema(options: SearchOption[]): any[] {
  const schema = [];
  for (const search of options) {
    if (typeof search.value === 'string') {
      search.value = search.value.trim();
    }
    const ajv = new Ajv();
    const valid = ajv.validate({
      not: {
        enum: ['', 0, null, [], {}]
      }
    }, search.value);
    if (valid || search.must) {
      const value = search.op === 'like' ? `%${search.value}%` : search.value;
      schema.push([search.field, search.op, value]);
    }
  }
  return schema;
}
