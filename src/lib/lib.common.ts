/**
 * getSelectorFormUrl
 */
import {SearchOptions} from './lib.types';

export const getSelectorFormUrl = (url: string, match: any[]) => {
  const regExp = new RegExp(`(?:${match[0]})(.+?)(?=${match[1]})`, 'g');
  return url.match(regExp)[0].replace(match[0], '');
};

/**
 * Production language package
 */
export const factoryLocales = (packer: any): any => {
  const source = {
    zh_cn: {},
    en_us: {}
  };
  for (const i in packer) {
    if (packer.hasOwnProperty(i)) {
      source.zh_cn[i] = packer[i][0];
      source.en_us[i] = packer[i][1];
    }
  }
  return source;
};

/**
 * Init i18n form control value
 */
export const i18nControlsValue = (i18n: string, value?: any): string => {
  if (!value) {
    return null;
  }
  if (value[i18n] !== undefined) {
    return value[i18n];
  } else {
    return null;
  }
};

/**
 * Init i18n form control validate
 */
export const i18nControlsValidate = (i18n: string, validate?: any): any[] => {
  if (!validate) {
    return [];
  }
  if (validate[i18n] !== undefined) {
    return validate[i18n];
  } else {
    return [];
  }
};

/**
 * Init i18n form control async validate
 */
export const i18nControlsAsyncValidate = (i18n: string, asyncValidate?: any): any[] => {
  if (!asyncValidate) {
    return [];
  }
  if (asyncValidate[i18n] !== undefined) {
    return asyncValidate[i18n];
  } else {
    return [];
  }
};

/**
 * Convert To Where
 */
export const ConvertToWhere = (condition: SearchOptions[]) => {
  const where = [];
  for (const x of condition) {
    if (typeof x.value === 'string') {
      x.value = x.value.trim();
    }
    if (!(x.value === '' || x.value === 0 || !x.value || (typeof x.value === 'object' && x.value.length === 0))
      || x.must) {
      where.push([x.field, x.op, (x.op === 'like' ? `%${x.value}%` : x.value)]);
    }
  }
  return where;
};
