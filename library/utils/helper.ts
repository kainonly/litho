import { HttpParams } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ApiOptions } from '../types';

export const toHttpParams = <T>(options?: ApiOptions<T>): HttpParams => {
  let params = new HttpParams();
  if (options?.keys) {
    options.keys.forEach(v => (params = params.append('keys', v as string)));
  }
  if (options?.sort) {
    options.sort.forEach((v, k) => {
      params = params.append('sort', `${k as string}:${v}`);
    });
  }
  return params;
};

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
