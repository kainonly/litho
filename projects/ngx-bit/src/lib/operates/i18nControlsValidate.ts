export function i18nControlsValidate(i18n: string, validate?: any): any[] {
  if (!validate) {
    return [];
  }
  if (validate[i18n] !== undefined) {
    return [validate[i18n]];
  } else {
    return [];
  }
}
