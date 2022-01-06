import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { NzTreeNode } from 'ng-zorro-antd/tree';

import { SearchOption, Where } from '../types';

export function updateFormGroup(controls: AbstractControl[]): void {
  controls.forEach(control => {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}

export function toSearchValues(options: Record<string, SearchOption>): Where<any> {
  const search: Where<any> = {};
  for (const [key, opt] of Object.entries(options)) {
    if (opt.value) {
      search[key] = {
        [opt.operator]: opt.operator === '$regex' ? `^${opt.value}` : opt.value
      };
    }
  }
  return search;
}

export function toSortValues(options: Record<string, NzTableSortOrder | 1 | -1>): string[] {
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
}

/**
 * 树视图展开状态
 */
export function TreeNodesExpanded(nodes: NzTreeNode[], value: boolean): void {
  for (const node of nodes) {
    node.isExpanded = value;
    if (node.children.length !== 0) {
      TreeNodesExpanded(node.children, value);
    }
  }
}

/**
 * 加载脚本
 */
export function loadScript(doc: Document, url: string): Observable<undefined> {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  doc.body.appendChild(script);
  return new Observable<undefined>(observer => {
    script.onload = () => {
      observer.next();
      observer.complete();
    };
  });
}
