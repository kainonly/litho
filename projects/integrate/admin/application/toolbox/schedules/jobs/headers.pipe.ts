import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormArray } from '@angular/forms';

@Pipe({ name: 'HeadersFormArray' })
export class HeadersPipe implements PipeTransform {
  transform(value: AbstractControl): UntypedFormArray {
    return value.get('option')!.get('headers') as UntypedFormArray;
  }
}
