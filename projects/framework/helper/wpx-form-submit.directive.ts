import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { updateFormGroup } from '@weplanx/framework';

@Directive({
  selector: 'form[bitFormSubmit]'
})
export class WpxFormSubmitDirective implements OnInit {
  @Output() readonly bitFormSubmit: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup.ngSubmit.subscribe(() => {
      updateFormGroup(Object.values(this.formGroup.control.controls));
      this.bitFormSubmit.emit(this.formGroup.value);
    });
  }
}
