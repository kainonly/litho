import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'form[bitFormSubmit]'
})
export class BitFormSubmitDirective implements OnInit {
  @Output() readonly bitFormSubmit: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  constructor(private form: FormGroupDirective) {}

  ngOnInit(): void {
    this.form.ngSubmit.subscribe(() => {
      Object.values(this.form.control.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      this.bitFormSubmit.emit(this.form.value);
    });
  }
}
