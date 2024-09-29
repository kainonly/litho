import { AbstractControl, FormGroup } from '@angular/forms';

import { parseISO } from 'date-fns';
import { NzTreeNode } from 'ng-zorro-antd/tree';

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

export const parseToTime = (iso8601: string): Date => {
  return timeOnly(parseISO(iso8601));
};

export const isEqualTime = (dateLeft: Date, dateRight: Date): boolean => {
  return (
    dateLeft.getUTCHours() === dateRight.getUTCHours() &&
    dateLeft.getUTCMinutes() === dateRight.getUTCMinutes() &&
    dateLeft.getUTCSeconds() === dateRight.getUTCSeconds() &&
    dateLeft.getUTCMilliseconds() === dateRight.getUTCMilliseconds()
  );
};

/**
 * Common Validation Logic
 */
export const validates = {
  password: (value: string) => {
    const len = value.length;
    if (len < 12) {
      return { min: true, error: true };
    }
    if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
      return { lowercase: true, error: true };
    }
    if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
      return { uppercase: true, error: true };
    }
    if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
      return { number: true, error: true };
    }
    if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
      return { symbol: true, error: true };
    }
    return null;
  }
};

/**
 * Tree view expanded state
 */
export const expandTreeNodes = (nodes: NzTreeNode[], value: boolean): void => {
  for (const node of nodes) {
    node.isExpanded = value;
    if (node.children.length !== 0) {
      expandTreeNodes(node.children, value);
    }
  }
};
