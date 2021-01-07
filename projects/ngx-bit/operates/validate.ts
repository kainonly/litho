import Ajv from 'ajv';
import AjvFormats from 'ajv-formats';

export function validate(schema: any, data: any): any {
  const ajv = new Ajv();
  AjvFormats(ajv);
  const valid = ajv.validate(schema, data);
  return {
    error: !valid,
    msg: ajv.errorsText()
  };
}
