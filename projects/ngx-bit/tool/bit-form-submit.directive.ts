import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'form[bitFormSubmit]'
})
export class BitFormSubmitDirective implements OnInit {
  @Output() readonly bitFormSubmit: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroup.ngSubmit.subscribe(() => {
      BitFormSubmitDirective.update(Object.values(this.formGroup.control.controls));
      this.bitFormSubmit.emit(this.formGroup.value);
    });
  }

  private static update(controls: AbstractControl[]): void {
    controls.forEach(control => {
      if (control instanceof FormGroup) {
        BitFormSubmitDirective.update(Object.values(control.controls));
      } else {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
  }
}
