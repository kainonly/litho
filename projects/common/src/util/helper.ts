import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';

import { NzTreeNode } from 'ng-zorro-antd/tree';

import { ApiOptions, Filter } from '../types';

/**
 * 生成 httpOptions
 * @param options
 * @param filter
 */
export const httpOptions = <T>(
  options: ApiOptions<T>,
  filter?: Filter<T>
): { headers: HttpHeaders; params: HttpParams } => {
  let headers = new HttpHeaders();
  if (options.limit) {
    headers = headers.set('wpx-limit', options.limit.toString());
  }
  if (options.skip) {
    headers = headers.set('wpx-skip', options.skip.toString());
  }
  if (options.format_filter) {
    for (const [key, value] of Object.entries(options.format_filter)) {
      headers = headers.append('wpx-format-filter', `${key}:${value}`);
    }
  }
  if (options.format_doc) {
    for (const [key, value] of Object.entries(options.format_doc)) {
      headers = headers.append('wpx-format-doc', `${key}:${value}`);
    }
  }
  let params = new HttpParams();
  if (filter) {
    params = params.set('filter', JSON.stringify(filter));
  }
  if (options.field) {
    for (const field of options.field) {
      params = params.append('field', field.toString());
    }
  }
  if (options.sort) {
    for (const [key, value] of Object.entries(options.sort)) {
      params = params.append('sort', `${key}.${value}`);
    }
  }
  return { headers, params };
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
      control.markAsDirty();
      control.updateValueAndValidity();
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
