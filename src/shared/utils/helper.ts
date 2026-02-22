import { AbstractControl, FormGroup } from '@angular/forms';

import { endOfDay, format, formatRFC3339, parseISO, startOfDay } from 'date-fns';

// 递归标记无效控件为已触摸并触发校验（包含嵌套 FormGroup）。
export const updateFormGroup = (controls: AbstractControl[]): void => {
  for (const control of controls) {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
      continue;
    }
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  }
};

// 返回仅包含输入 UTC 时间部分的 Date。
export const timeOnly = (date: Date): Date => {
  const result = new Date(0);
  result.setUTCHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  return result;
};

// 返回仅包含输入 UTC 日期部分的 Date。
export const datetimeOnly = (date: Date): Date => {
  const result = new Date(0);
  result.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return result;
};

// 返回今天的本地起始与结束时间。
export const getTodayRange = (): Date[] => {
  const today = new Date();
  return [startOfDay(today), endOfDay(today)];
};

// 解析 ISO 字符串，并仅保留 UTC 时间部分。
export const parseToTime = (iso8601: string): Date => timeOnly(parseISO(iso8601));

// 格式化日期为 yyyy-MM-dd。
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// 格式化日期为 RFC3339。
export const formatRFC = (date: Date): string => formatRFC3339(date);

// 按 UTC 时间（时分秒毫秒）比较两个日期是否相等。
export const isEqualTime = (dateLeft: Date, dateRight: Date): boolean => {
  return (
    dateLeft.getUTCHours() === dateRight.getUTCHours() &&
    dateLeft.getUTCMinutes() === dateRight.getUTCMinutes() &&
    dateLeft.getUTCSeconds() === dateRight.getUTCSeconds() &&
    dateLeft.getUTCMilliseconds() === dateRight.getUTCMilliseconds()
  );
};

// 将数组转换为以指定键提取函数为键的字典，可选值提取函数，默认使用元素本身。
export const toM = <T, K extends string | number, V = T>(
  values: readonly T[],
  keyFn: (item: T) => K,
  valueFn?: (item: T) => V
): Record<K, V> => {
  const result = {} as Record<K, V>;
  for (const value of values) {
    result[keyFn(value)] = (valueFn ? valueFn(value) : value) as V;
  }
  return result;
};
