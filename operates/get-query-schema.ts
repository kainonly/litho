import * as Ajv from 'ajv';
import { SearchOption } from '../types/search-option';

export function getQuerySchema(options: SearchOption[]) {
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
