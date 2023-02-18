import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { NzTreeNode } from 'ng-zorro-antd/tree';

import { ApiOptions, Filter } from '../types';

export const setHttpOptions = <T>(
  filter?: Filter<T>,
  options?: ApiOptions<T>
): { headers: HttpHeaders; params: HttpParams } => {
  let headers = new HttpHeaders();
  if (options?.page) {
    headers = headers.set('x-page', options.page.toString());
  }
  if (options?.pagesize) {
    headers = headers.set('x-pagesize', options.pagesize.toString());
  }
  let params = new HttpParams();
  if (filter) {
    params = params.set('filter', JSON.stringify(filter));
  }
  if (options?.keys) {
    options.keys.forEach(v => (params = params.append('keys', v as string)));
  }
  if (options?.sort) {
    options.sort.forEach((v, k) => {
      params = params.append('sort', `${k as string}:${v}`);
    });
  }
  if (options?.xfilter && Object.keys(options.xfilter).length !== 0) {
    params = params.set('format', JSON.stringify(options.xfilter));
  }
  return { headers, params };
};

export const updateFormGroup = (controls: AbstractControl[]): void => {
  controls.forEach(control => {
    if (control instanceof UntypedFormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    }
  });
};

/**
 * Common Validation Logic
 */
export const validates = {
  password: (value: string, level?: number) => {
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
