/**
 * getSelectorFormUrl
 */
export const getSelectorFormUrl = (url: string, match: any[]) => {
  const regExp = new RegExp(`(?:${match[0]})(.+?)(?=${match[1]})`, 'g');
  return url.match(regExp)[0].replace(match[0], '');
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
