import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

import { SearchOption, SearchValue } from '../types';

export function asyncValidator(
  handle: Observable<boolean>,
  field = 'duplicated',
  dueTime = 500
): Observable<Record<string, any> | null> {
  return timer(dueTime).pipe(
    switchMap(() => handle),
    map(result => {
      return !result ? { error: true, [field]: true } : null;
    })
  );
}

export function updateFormGroup(controls: AbstractControl[]) {
  controls.forEach(control => {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}

export function getSearchValues(options: Record<string, SearchOption>): Record<string, SearchValue> {
  const search: Record<string, SearchValue> = {};
  for (const [key, opt] of Object.entries(options)) {
    if (opt.value) {
      search[key] = {
        [opt.operator]: opt.operator === '$regex' ? `^${opt.value}` : opt.value
      };
    }
  }
  return search;
}

export function getSortValues(options: Record<string, NzTableSortOrder>): Record<string, number> {
  const sort: Record<string, number> = {};
  for (const [key, opt] of Object.entries(options)) {
    switch (opt) {
      case 'ascend':
        sort[key] = 1;
        break;
      case 'descend':
        sort[key] = -1;
    }
  }
  return sort;
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
