import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { Any } from '@common';

import { updateFormGroup } from '../utils/helper';

@Directive({
  standalone: true,
  selector: 'form[appSubmit]'
})
export class SubmitDirective implements OnInit {
  @Output() readonly appSubmit: EventEmitter<Any> = new EventEmitter<Any>();

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup.ngSubmit.subscribe(() => {
      if (!this.formGroup.valid) {
        updateFormGroup(Object.values(this.formGroup.control.controls));
      } else {
        this.appSubmit.emit(this.formGroup.value);
      }
    });
  }
}
