import {Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Directive({
  selector: '[bitFormSubmit]'
})
export class BitFormSubmitDirective implements OnInit {
  @Output() bitFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private form: FormGroupDirective
  ) {
  }

  ngOnInit() {
    this.form.ngSubmit.subscribe(_ => {
      const controls = this.form.control.controls;
      for (const key in controls) {
        if (controls.hasOwnProperty(key)) {
          controls[key].markAsDirty();
          controls[key].updateValueAndValidity();
        }
      }
      this.bitFormSubmit.emit(this.form.value);
    });
  }
}
