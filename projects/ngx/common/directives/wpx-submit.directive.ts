import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { updateFormGroup } from '@weplanx/ngx';

@Directive({
  selector: 'form[wpxSubmit]'
})
export class WpxSubmitDirective implements OnInit {
  @Output() readonly wpxSubmit: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup.ngSubmit.subscribe(() => {
      updateFormGroup(Object.values(this.formGroup.control.controls));
      this.wpxSubmit.emit(this.formGroup.value);
    });
  }
}
