import { HttpParams } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';

import { NzTreeNode } from 'ng-zorro-antd/tree';

import { ApiOptions, Filter } from '../types';

export const setHttpParams = <T>(filter?: Filter<T>, options?: ApiOptions<T>): HttpParams => {
  let params = new HttpParams();
  if (filter) {
    params = params.set('filter', JSON.stringify(filter));
  }
  if (options?.keys) {
    params = params.set('keys', JSON.stringify(options.keys));
  }
  if (options?.sort) {
    params = params.set('sort', JSON.stringify(options.sort));
  }
  if (options?.limit) {
    params = params.set('limit', options.limit);
  }
  if (options?.skip) {
    params = params.set('skip', options.skip);
  }
  if (options?.page) {
    params = params.set('page', options.page);
  }
  if (options?.pagesize) {
    params = params.set('pagesize', options.pagesize);
  }
  if (options?.xfilter && Object.keys(options.xfilter).length !== 0) {
    params = params.set(
      'xfilter',
      Object.entries(options.xfilter)
        .map(([key, value]) => `${key}:${value}`)
        .join(',')
    );
  }
  if (options?.xdoc && Object.keys(options.xdoc).length !== 0) {
    params = params.set(
      'xdoc',
      Object.entries(options.xdoc)
        .map(([key, value]) => `${key}:${value}`)
        .join(',')
    );
  }
  // const queryOptions: Record<string, any> = {};
  // if (options?.array_filters) {
  //   queryOptions['array_filters'] = options.array_filters;
  // }
  // if (Object.keys(queryOptions).length !== 0) {
  //   params = params.set('options', JSON.stringify(queryOptions));
  // }
  return params;
};

/**
 * 更新 FormGroup 状态
 * @param controls
 */
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

/**
 * 通用验证
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
 * 树视图展开状态
 */
export const expandTreeNodes = (nodes: NzTreeNode[], value: boolean): void => {
  for (const node of nodes) {
    node.isExpanded = value;
    if (node.children.length !== 0) {
      expandTreeNodes(node.children, value);
    }
  }
};
