import * as Ajv from 'ajv';

export function validate(schema: any, data: any): any {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, data);
  return {
    error: !valid,
    msg: ajv.errorsText()
  };
}
