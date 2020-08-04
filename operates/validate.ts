import * as AjvFactory from 'ajv';
import { Ajv } from 'ajv';

export function validate(schema: string | boolean | object, data: any): any {
  const ajv: Ajv = new AjvFactory();
  const valid = ajv.validate(schema, data);
  return {
    error: !valid,
    msg: ajv.errorsText()
  };
}
