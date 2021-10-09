import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { updateFormGroup } from '@weplanx/ngx';

@Directive({
  selector: 'form[wpxFormSubmit]'
})
export class WpxFormSubmitDirective implements OnInit {
  @Output() readonly wpxFormSubmit: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup.ngSubmit.subscribe(() => {
      updateFormGroup(Object.values(this.formGroup.control.controls));
      this.wpxFormSubmit.emit(this.formGroup.value);
    });
  }
}
