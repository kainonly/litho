import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'form[bitFormSubmit]'
})
export class BitFormSubmitDirective implements OnInit {
  @Output() readonly bitFormSubmit: EventEmitter<Record<string, any>> = new EventEmitter();

  constructor(private form: FormGroupDirective) {}

  ngOnInit(): void {
    this.form.ngSubmit.subscribe(() => {
      for (const control of Object(this.form.control.controls)) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
      this.bitFormSubmit.emit(this.form.value);
    });
  }
}
