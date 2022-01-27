import { HttpContextToken } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { NzTreeNode } from 'ng-zorro-antd/tree';

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

export const toSortValues = (options: Record<string, NzTableSortOrder | 1 | -1>): string[] => {
  const sort: string[] = [];
  for (const [field, value] of Object.entries(options)) {
    if (!value) {
      continue;
    }
    let order: number;
    switch (value) {
      case 'ascend':
        order = 1;
        break;
      case 'descend':
        order = -1;
        break;
      default:
        order = value as number;
    }
    sort.push(`${field}.${order}`);
  }
  return sort;
};

/**
 * 树视图展开状态
 */
export const TreeNodesExpanded = (nodes: NzTreeNode[], value: boolean): void => {
  for (const node of nodes) {
    node.isExpanded = value;
    if (node.children.length !== 0) {
      TreeNodesExpanded(node.children, value);
    }
  }
};

/**
 * 密码规则
 * @param value
 */
export const PasswordRule = (value: string): any => {
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
};

/**
 * 加载脚本
 */
export const loadScript = (doc: Document, url: string): Observable<any> => {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  doc.body.appendChild(script);
  return new Observable<any>(observer => {
    script.onload = () => {
      observer.next();
      observer.complete();
    };
  });
};
