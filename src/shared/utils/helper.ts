import { AbstractControl, FormGroup } from '@angular/forms';

import { EnumType } from '@shared/models';
import { endOfDay, format, formatRFC3339, parseISO, startOfDay } from 'date-fns';

export const updateFormGroup = (controls: AbstractControl[]): void => {
  controls.forEach(control => {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    }
  });
};

export const timeOnly = (date: Date) => {
  const timeOnly = new Date();
  timeOnly.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  return timeOnly;
};

export const datetimeOnly = (date: Date) => {
  const dateOnly = new Date();
  dateOnly.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return dateOnly;
};

export const getTodayRange = (): Date[] => {
  const today = new Date();
  return [startOfDay(today), endOfDay(today)];
};

export const parseToTime = (iso8601: string): Date => {
  return timeOnly(parseISO(iso8601));
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatRFC = (date: Date): string => {
  return formatRFC3339(date);
};

export const isEqualTime = (dateLeft: Date, dateRight: Date): boolean => {
  return (
    dateLeft.getUTCHours() === dateRight.getUTCHours() &&
    dateLeft.getUTCMinutes() === dateRight.getUTCMinutes() &&
    dateLeft.getUTCSeconds() === dateRight.getUTCSeconds() &&
    dateLeft.getUTCMilliseconds() === dateRight.getUTCMilliseconds()
  );
};

export const toM = (values: EnumType[]): Record<number, string> => {
  return values.reduce(
    (previousValue, currentValue) => {
      previousValue[currentValue.value] = currentValue.label;
      return previousValue;
    },
    {} as Record<number, string>
  );
};
