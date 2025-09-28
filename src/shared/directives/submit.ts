import { Directive, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { updateFormGroup } from '@shared';
import { Any } from '@shared/models';

@Directive({
  standalone: true,
  selector: 'form[appSubmit]'
})
export class Submit implements OnInit {
  private formGroup = inject(FormGroupDirective);
  @Output() readonly appSubmit: EventEmitter<Any> = new EventEmitter<Any>();

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
