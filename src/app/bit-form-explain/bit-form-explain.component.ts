import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'bit-form-explain',
  templateUrl: './bit-form-explain.component.html'
})
export class BitFormExplainComponent {
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() async = false;
  @Input() explain: string[][] = [];

  formExplainError() {
    return this.async ?
      this.form.get(this.name).dirty && this.form.get(this.name).errors || this.form.get(this.name).pending :
      this.form.get(this.name).dirty && this.form.get(this.name).errors;
  }
}
