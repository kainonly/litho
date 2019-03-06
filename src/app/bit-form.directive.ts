import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: '[bitSubmit]'
})
export class BitFormDirective implements OnInit {
  @Output() bitSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private form: FormGroupDirective) {
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
      this.bitSubmit.emit(this.form.value);
    });
  }
}
