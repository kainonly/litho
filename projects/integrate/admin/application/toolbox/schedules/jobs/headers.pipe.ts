import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({ name: 'HeadersFormArray' })
export class HeadersPipe implements PipeTransform {
  transform(value: AbstractControl): FormArray {
    return value.get('option')!.get('headers') as FormArray;
  }
}
